// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import { useGetUser } from "../../../hooks/use-get-user";
import React, { useState } from "react";
import Header from "./components/Header";
import ProfileInformation from "./components/ProfileInformation";
import { useRecoilState } from "recoil";
import { userState } from "../../../state/index";

const Role = {
  0: "Пользователь",
  1: "Администратор",
};

function Profile() {
  // Chakra color mode
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const [user, setUser] = useRecoilState(userState);
  const { userInfo, isLoading } = useGetUser(user.id);

  const { firstName, lastName, fatherName, email, role } = userInfo || {};
  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
        <ProfileInformation
          title={"Информация о профиле"}
          firstName={firstName}
          lastName={lastName}
          fatherName={fatherName}
          email={email}
          role={Role[role]}
        />
      </Grid>
    </Flex>
  );
}

export default Profile;
