import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function TeamCard({ name, image, details, education }) {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-image" />

      <div className="team-info">
        <h3>{name}</h3>

        <div className="team-columns">
          {/* Section ประสบการณ์ */}
          <div className="info-column">
            <div className="column-header">
              <FaBriefcase className="icon-blue" />
              <h4>ประสบการณ์</h4>
            </div>
            <ul className="info-list">
              {details.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* Section การศึกษา */}
          <div className="info-column">
            <div className="column-header">
              <FaGraduationCap className="icon-blue" />
              <h4>การศึกษา</h4>
            </div>
            <ul className="info-list">
              {education.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}