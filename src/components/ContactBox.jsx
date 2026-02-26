import { FaLine, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function ContactBox({ contactInfo }) {
  const { title, person } = contactInfo;

  return (
    <div className="contact-box">
      <h3 className="contact-heading">{title.toUpperCase()}</h3>

      <div className="contact-person-section">
        <div className="avatar-wrapper">
          <img src={person.image} alt={person.name} className="contact-avatar" />
          <span className="online-dot"></span>
        </div>
        <div className="person-name-group">
            <p className="person-display-name">{person.name}</p>
            <p className="person-role-id">{person.roleId || "PUWASIT PANOMSING"}</p>
        </div>
      </div>

      <div className="contact-methods">
          {/* LINE */}
          <div className="contact-item">
            <div className="contact-left">
              <div className="icon-box-bg line-bg">
                <FaLine className="line-icon-color" />
              </div>
              <div className="text-group">
                <span className="label">LINE ID</span>
                <p className="value">{person.lineId}</p>
              </div>
            </div>
            <FaChevronRight className="arrow-icon" />
          </div>

          {/* PHONE */}
          <div className="contact-item">
            <div className="contact-left">
              <div className="icon-box-bg phone-bg">
                <FaPhoneAlt className="phone-icon-color" />
              </div>
              <div className="text-group">
                <span className="label">PHONE NUMBER</span>
                <p className="value">{person.phone}</p>
              </div>
            </div>
            <FaChevronRight className="arrow-icon" />
          </div>
      </div>

      <button className="send-btn">
        <FiSend className="btn-icon" />
        ส่งข้อความหาเรา
      </button>
    </div>
  );
}