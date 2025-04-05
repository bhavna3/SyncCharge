import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

export default function HomeScreen() {
  const [batteryData, setBatteryData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBatteryData = async () => {
    try {
      const response = await fetch(
        'https://synccharge-17361-default-rtdb.asia-southeast1.firebasedatabase.app/.json'
      );
      const data = await response.json();
      const battery = data?.battery_status;
      setBatteryData(battery);
    } catch (error) {
      console.error('Error fetching battery data:', error);
    }
  };

  useEffect(() => {
    fetchBatteryData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBatteryData().then(() => setRefreshing(false));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>🔋 SyncCharge</Text>
      <Text style={styles.text}>
        Battery: {batteryData?.battery_percent ?? 'Unknown'}%
      </Text>
      <Text style={styles.text}>
        Plugged In: {batteryData?.plugged_in ? 'Yes' : 'No'}
      </Text>

      <Text style={styles.text}>
        Last Update:{' '}
        {batteryData?.timestamp
          ? new Date(batteryData.timestamp).toLocaleString()
          : 'N/A'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#00ffcc',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 6,
  },
});
