/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";

import BannedUsersPage, {
  BannedUsersPageOptions,
} from "../components/communities/BannedUsersPage";
import CommunityAdministrationPage, {
  CommunityAdministrationPageOptions,
} from "../components/communities/CommunityAdministrationPage";
import MemberListPage, {
  MemberListPageOptions,
} from "../components/communities/MemberListPage";
import JoinCommunityPage, {
  JoinCommunityPageOptions,
} from "../components/communities/JoinCommunityPage";
import LeaveCommunityPage, {
  LeaveCommunityPageOptions,
} from "../components/communities/LeaveCommunityPage";
import CommunityHomePage, {
  CommunityHomePageOptions,
} from "../components/communities/CommunityHomePage";
import { Theme } from "../theme";
import CommunityStatsPage, {
  CommunityStatsPageOptions,
} from "../components/communities/CommunityStatsPage";
import CreateCommunityPage from "../components/communities/CreateCommunityPage"; // CreateCommunityPageOptions,

import CommunityTabScreen from "./CommunityTabScreen";
import { DrawerIcon } from "./DrawerIcon";
import { NotificationCenterIcon } from "./NotificationCenterIcon";

const CommunityStack = createStackNavigator();

const CommunityStackScreen = ({}) => {
  const theme = useTheme<Theme>();
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <CommunityStack.Screen
        name="Communities"
        component={CommunityTabScreen}
        options={{
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <CommunityStack.Screen
        name="CommunityHome"
        component={CommunityHomePage}
        options={{
          ...CommunityHomePageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <CommunityStack.Screen
        name="BannedUsers"
        component={BannedUsersPage}
        options={{
          ...BannedUsersPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <CommunityStack.Screen
        name="CommunityAdministration"
        component={CommunityAdministrationPage}
        options={{
          ...CommunityAdministrationPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <CommunityStack.Screen
        name="MemberList"
        component={MemberListPage}
        options={{
          ...MemberListPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
        initialParams={{ name: "Johnsons" }}
      />
      <CommunityStack.Screen
        name="CreateCommunity"
        component={CreateCommunityPage}
        // TODO this isnt working dunno why, just want to get the merge done
        // options={CreateCommunityPageOptions}

        // @whoever made this comment, CreateCommunityPage is already under CommunityTabScreen's Tab Navigator
        // That may have something to do with it
      />
      <CommunityStack.Screen
        name="JoinCommunity"
        component={JoinCommunityPage}
        options={JoinCommunityPageOptions}
      />
      <CommunityStack.Screen
        name="LeaveCommunity"
        component={LeaveCommunityPage}
        options={LeaveCommunityPageOptions}
      />
      <CommunityStack.Screen
        name="CommunityStats"
        component={CommunityStatsPage}
        options={{
          ...CommunityStatsPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
    </CommunityStack.Navigator>
  );
};

export default CommunityStackScreen;
