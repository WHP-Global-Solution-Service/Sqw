import React from "react";
import TeamCard from "./TeamCard";
import ContactBox from "./ContactBox";
import { teamMembers, contactInfo } from "../mocks/contactMock";
import "../css/contact.css"

export default function Contact() {
  return (
    <>
      <div className="contact-container">
        <h1 className="contact-title">ติดต่อเรา</h1>

        <div className="contact-content">
          <div className="team-section">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>

          <ContactBox contactInfo={contactInfo} />
        </div>
      </div>
    </>
  );
}