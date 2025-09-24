import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import Header from "@/components/header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const CustomTabBar = () => (
    <LinearGradient
      colors={["#006c36ff", "#000088ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header fijo */}
      <Header />

      {/* Contenido de las pestañas */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarBackground: CustomTabBar,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "INICIO",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="mascotas"
            options={{
              title: "MASCOTAS",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="heart.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="refugios"
            options={{
              title: "REFUGIOS",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="shield.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="comunidad"
            options={{
              title: "COMUNIDAD",
              tabBarIcon: ({ color }) => (
                <IconSymbol
                  size={28}
                  name="bubble.left.and.bubble.right.fill"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "AJUSTES",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gearshape.fill" color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
