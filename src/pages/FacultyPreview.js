import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getFaculties } from "../store/faculties";
import moment from "moment";

import {
  Avatar,
  BasicInfoItem,
  LetterAvatar,
  ProfileItem,
} from "../components";
import {
  FiCalendar,
  FiMail,
  FiMapPin,
  FiPhoneCall,
  FiEdit,
} from "react-icons/fi";

export default function FacultyPreview({ match }) {
  const [imageError, setImageError] = useState(false);

  const id = match.params.id;
  const faculties = useSelector(getFaculties);

  const facultyList = faculties.list.filter((faculty) => faculty._id === id);
  const faculty = facultyList[0];

  return (
    <AppContainer>
      <div>
        <ProfileContainer>
          {!faculty.image.current || imageError ? (
            <LetterAvatar user={faculty} size={100} />
          ) : (
            <Avatar
              size={100}
              user={faculty}
              onError={() => setImageError(true)}
            />
          )}
          <h3 className="mt-2">
            {faculty.name.firstName} {faculty.name.lastName}
          </h3>
          <p>{faculty.college.full}</p>
        </ProfileContainer>

        {/*  primary information */}
        <PrimaryContainer>
          <Header>
            <h5 className="m-0">Primary Information</h5>
          </Header>
          <ProfileItem
            title="Email Address"
            icon={FiMail}
            text={faculty.email}
          />
          <ProfileItem
            title="Contact Number"
            icon={FiPhoneCall}
            text={faculty.contact || "Not yet defined."}
          />
          <ProfileItem
            title="Birth Date"
            icon={FiCalendar}
            text={`Born in, ${
              moment(faculty.birthDate).format("LL") || "Not yet defined."
            }`}
          />
          <ProfileItem
            title="Address"
            icon={FiMapPin}
            text={
              faculty.address.houseNumber &&
              faculty.address.street &&
              faculty.address.barangay &&
              faculty.address.barangay &&
              faculty.address.city &&
              faculty.address.province
                ? `${faculty.address.houseNumber} ${faculty.address.street} ${faculty.address.barangay} ${faculty.address.city} ${faculty.address.province}`
                : "Not yet defined."
            }
          />
        </PrimaryContainer>
      </div>

      {/* basic informations */}
      <BasicContainer>
        <Header>
          <h5 className="m-0">Basic Information</h5>
        </Header>
        <Content>
          <BasicInfoItem title="First Name" item={faculty.name.firstName} />
          <BasicInfoItem
            title="Middle Name"
            item={faculty.name.middleName || "Not yet defined."}
          />
          <BasicInfoItem title="Last Name" item={faculty.name.lastName} />
          <BasicInfoItem
            title="Gender"
            item={faculty.gender || "Not yet defined."}
          />
          <BasicInfoItem
            title="Date of Birth"
            item={moment(faculty.birthDate).format("LL") || "Not yet defined."}
          />
          <BasicInfoItem
            title="Age"
            item={
              moment().diff(faculty.birthDate, "years") || "Not yet defined."
            }
          />
          <BasicInfoItem
            title="Department"
            item={faculty.dept || "Not yet defined."}
          />
          <BasicInfoItem
            title="Position"
            item={faculty.position || "Not yet defined."}
          />
          <BasicInfoItem
            title="Highest qualification"
            item={faculty.qualification || "Not yet defined."}
          />
        </Content>
      </BasicContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const ProfileContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white};
`;

const PrimaryContainer = styled.div`
  margin-top: 0.5rem;
  display: grid;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white};
`;

const BasicContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;
