import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import {
  getMeetupDetails,
  acceptMeetup,
  declineMeetup,
  setMeetupLocations,
} from "../../contexts/meetupContext";
import { useTokenState } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import {
  MeetupResponsePageRouteProp,
  MeetupResponsePageNavigationProp,
} from "../../routes";
import theme from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";

import MeetupCard from "./MeetupCard";

type MeetupResponsePageProps = {
  route: MeetupResponsePageRouteProp;
  navigation: MeetupResponsePageNavigationProp;
};

export const MeetupResponsePageOptions: StackNavigationOptions = {
  title: "RSVP",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupReponsePage({
  route,
  navigation,
  route,
}: MeetupResponsePageProps) {
  const { meetupID, timestamp, location, duration, userList } = route.params;
  const onAccept = async () => {
    console.log(
      await setMeetupLocations(refreshToken, email, meetupID, locations)
    );
    console.log(await acceptMeetup(refreshToken, email, meetupID));
    navigation.pop();
  };
  const onDecline = async () => {
    console.log(await declineMeetup(refreshToken, email, meetupID));
    navigation.pop();
  };

  const renderLocations = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => <Text variant="body">{`${index + 1}. ${item}`}</Text>;
  const [locations, setLocations] = useState(["Online", "WALC", "LWSN"]);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} width="95%">
        <MeetupCard
          id={meetupID}
          timestamp={timestamp}
          location={location}
          duration={duration}
          userList={userList}
          meetupType={"tentative"}
          isClickable={false}
        />

        <ThemedCard>
          <Text variant="header">Top Ranked Locations</Text>
          <FlatList
            data={locations.slice(0, Math.min(3, locations.length))}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={renderLocations}
          />
          <Box marginTop="sm">
            <TouchableOpacity
              onPress={() =>
                navigation.push("LocationRanker", { locations, setLocations })
              }
            >
              <Text variant="link">Rank Locations</Text>
            </TouchableOpacity>
          </Box>
        </ThemedCard>
      </Box>

      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-around"
        width="95%"
      >
        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="cross"
            type="entypo"
            onPress={onDecline}
            color={theme.colors.iconSelectedRed}
          />
          <Text variant="body">Decline</Text>
        </Box>

        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="check"
            type="entypo"
            onPress={onAccept}
            color={theme.colors.iconSelectedGreen}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
