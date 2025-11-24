var kmlToLongdoMap = function (map, kml, options = {}) {
    const normNum = (v) => v == null ? null : Number(String(v).replace(/[, ]/g, ''));
    const pickNumeric = (props, keys) => {
        for (const k of keys) {
            if (props && props[k] != null && String(props[k]).trim() !== '') {
                const n = normNum(props[k]);
                if (!Number.isNaN(n)) return n;
            }
        }
        return null;
    };
    let resultOverlays = {
        Marker: [],
        Polygon: [],
        Polyline: [],
        overlays: [],
        features: [],
    }
    function attachProps(ov, type, props) {
        // แมปชื่อฟิลด์ที่เราใช้ใน UI filter
        const f = {
            name: props?.name || null,
            description: props?.description || null,
            // รองรับชื่อเรียกหลายแบบจาก ExtendedData/SimpleData
            area: pickNumeric(props, ['area', 'ขนาด', 'size', 'ตรว', 'ตร.วา']),
            pricePerSqw: pickNumeric(props, ['pricePerSqw', 'price_per_sqw', 'บาท_ตรว', 'บาท/ตร.วา', 'price']),
            frontage: pickNumeric(props, ['frontage', 'หน้ากว้าง', 'width']),
            roadWidth: pickNumeric(props, ['road', 'roadWidth', 'ความกว้างถนน']),
        };
        ov.__kml = { type, props: f };
        resultOverlays.features.push({ overlay: ov, type, props: f });
    }

    if (!map || !kml) {
        return resultOverlays
    }

    kml = getKmlData(kml)
    let geoJson = toGeoJSON.kml(kml)
    let features = geoJson.features
    let allLon = []
    let allLat = []

    for (let feature of features) {
        addOverlayByType(feature)
    }

    if (allLon.length > 0 && allLat.length > 0) {
        let minMaxLon = minMaxArr(allLon)
        let minMaxLat = minMaxArr(allLat)
        map.bound({
            minLon: minMaxLon.min,
            minLat: minMaxLat.min,
            maxLon: minMaxLon.max,
            maxLat: minMaxLat.max
        })
    }

    function minMaxArr(arr) {
        let max = arr[0]
        let min = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i]
            }
            if (min > arr[i]) {
                min = arr[i]
            }
        }
        return { max: max, min: min }
    }

    function setDonutGeomData(data) {
        let secArr = []
        let passSec = false
        let replaceIndex = 0
        for (let point of data) {
            if (passSec) {
                secArr.push(point)
            } else {
                passSec = point === null
                replaceIndex++
            }
        }
        if (isClockwise(secArr)) {
            secArr.reverse()
        }
        data.splice(replaceIndex)
        data = data.concat(secArr)
        return data
    }

    function isClockwise(arr = []) {
        let sum = 0
        let pop = null
        let lastIndex = arr.length - 1
        if (arr.length > 0) {
            if ((arr[0].lat === arr[arr.length - 1].lat) && (arr[0].lon === arr[arr.length - 1].lon)) {
                lastIndex--
            }
            for (let i = 0; i < lastIndex + 1; i++) {
                if (i === lastIndex) {
                    sum += (arr[0].lat - arr[i].lat) * (arr[0].lon + arr[i].lon)
                } else {
                    sum += (arr[i + 1].lat - arr[i].lat) * (arr[i + 1].lon + arr[i].lon)
                }
            }
        }
        return sum >= 0
    }

    function addOverlayByType(feature) {
        let type = feature.geometry.type
        switch (type) {
            case 'Point':
                addMarker(feature)
                break

            case 'Polygon':
                addPolygon(feature)
                break

            case 'LineString':
                addPolyline(feature)
                break

            case 'GeometryCollection':
                addGeometryCollection(feature)
                break

            default:
                console.log(type + ' is not supported.')
                break
        }
    }

    function getKmlData(kml) {
        if (typeof kml === 'string') {
            kml = (new DOMParser()).parseFromString(kml, 'text/xml')
        }
        return kml
    }

    function addGeometryCollection(feature) {
        let features = feature.geometry.geometries
        for (let item of features) {
            let tempObj = {
                geometry: item,
                properties: feature.properties
            }
            addOverlayByType(tempObj)
        }
    }

    function addMarker(feature) {
        let pos = feature.geometry.coordinates
        let props = feature.properties
        let lon = pos[0]
        let lat = pos[1]
        const baseOpts = {
            title: props.name,
            detail: props.description,
            visibleRange: { min: 6, max: 20 }
        }
        // ถ้า KML มีไอคอนเฉพาะ ให้ใช้ก่อน (props.icon มาจาก toGeoJSON):contentReference[oaicite:0]{index=0}
        if (props.icon) {
            baseOpts.icon = { url: props.icon }
        }
        // override ด้วย markerOptions จาก options (ถ้ามี)
        const markerOpts = Object.assign(baseOpts, options.markerOptions || {})
        let marker = new longdo.Marker({ lon: lon, lat: lat }, markerOpts)
        let temp = map.Overlays.add(marker)
        resultOverlays.Marker.push(temp)
        resultOverlays.overlays.push(temp)
        attachProps(temp, 'Point', props)
        allLon.push(pos[0])
        allLat.push(pos[1])
    }

    function addPolygon(feature) {
        let pos = feature.geometry.coordinates
        let props = feature.properties
        let lineColor = hexToRgb(props.stroke)
        let fillColor = hexToRgb(props.fill)
        let info = {
            title: props.name,
            detail: props.description,
            lineWidth: 1
        }
        if (setRgbaColor(lineColor)) {
            info.lineColor = setRgbaColor(lineColor)
        }
        if (setRgbaColor(fillColor, 0.4)) {
            info.fillColor = setRgbaColor(fillColor, 0.4)
        }
        // === override ด้วย options (ถ้ามี) ===
        if (options.geometryOptions) {
            if (options.geometryOptions.lineColor) info.lineColor = options.geometryOptions.lineColor;
            if (options.geometryOptions.fillColor) info.fillColor = options.geometryOptions.fillColor;
            if (options.geometryOptions.lineWidth != null) info.lineWidth = options.geometryOptions.lineWidth;
        }
        let isDonut = pos.length === 2
        let locationList = []
        let count = 0
        for (let item of pos) {

            if (!isDonut) {
                locationList = []
            } else if (isDonut && locationList.length > 0) {
                locationList.push(null)
            }
            for (let row of item) {
                let lon = row[0]
                let lat = row[1]
                locationList.push({ lon: lon, lat: lat })
                allLon.push(lon)
                allLat.push(lat)
            }
            if (!isDonut && locationList.length >= 3) {
                let geom = new longdo.Polygon(locationList, info)
                let temp = map.Overlays.add(geom)
                resultOverlays.Polygon.push(temp)
                resultOverlays.overlays.push(temp)
                attachProps(temp, 'Polygon', props)
            } else if (isDonut && count === 1 && locationList.length >= 3) {
                locationList = setDonutGeomData(locationList)
                let geom = new longdo.Polygon(locationList, info)
                let temp = map.Overlays.add(geom)
                resultOverlays.Polygon.push(temp)
                resultOverlays.overlays.push(temp)
                attachProps(temp, 'Polygon', props)
            }
            count++
        }
        if (locationList.length > 2) {
            let cx = 0, cy = 0;
            locationList.forEach(p => { cx += p.lon; cy += p.lat; });
            cx /= locationList.length; cy /= locationList.length;
            const m = new longdo.Marker({ lon: cx, lat: cy }, options.markerOptions || {});
            map.Overlays.add(m);
            resultOverlays.Marker.push(m);
            resultOverlays.overlays.push(m);
        }
    }

    function addPolyline(feature) {
        let pos = feature.geometry.coordinates
        let props = feature.properties
        let lineColor = hexToRgb(props.stroke)
        let info = {
            title: props.name,
            detail: props.description,
            lineWidth: 1
        }
        if (setRgbaColor(lineColor)) {
            info.lineColor = setRgbaColor(lineColor)
        }
        // === override ด้วย options (ถ้ามี) ===
        if (options.geometryOptions) {
            if (options.geometryOptions.lineColor) info.lineColor = options.geometryOptions.lineColor;
            if (options.geometryOptions.lineWidth != null) info.lineWidth = options.geometryOptions.lineWidth;
        }
        let locationList = []
        for (let item of pos) {
            let lon = item[0]
            let lat = item[1]
            locationList.push({ lon: lon, lat: lat })
            allLon.push(lon)
            allLat.push(lat)
        }
        let geom = new longdo.Polyline(locationList, info)
        let temp = map.Overlays.add(geom)
        resultOverlays.Polyline.push(temp)
        resultOverlays.overlays.push(temp)
        attachProps(temp, 'LineString', props)
    }

    function setRgbaColor(colorObj, a = 1) {
        let rgbStr = null
        if (colorObj !== null) {
            rgbStr = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${a})`
        }
        return rgbStr
    }

    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }

    return resultOverlays
}
window.kmlToLongdoMap = kmlToLongdoMap;


