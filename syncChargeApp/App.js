import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { database, ref, get } from './firebaseConfig';

export default function App() {
  const [batteryData, setBatteryData] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const snapshot = await get(ref(database, 'battery_status'));
        if (snapshot.exists()) {
          setBatteryData(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBatteryStatus();
  }, []);

  if (!batteryData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading battery status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔋 SyncCharge</Text>
      <Text>Battery: {batteryData.battery_percent}%</Text>
      <Text>Plugged In: {batteryData.plugged_in ? 'Yes' : 'No'}</Text>
      <Text>Last Updated: {new Date(batteryData.timestamp).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20
  }
});
