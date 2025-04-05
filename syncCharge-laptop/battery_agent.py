import psutil
from datetime import datetime
import json
import requests
import ctypes

FIREBASE_URL = "https://synccharge-17361-default-rtdb.asia-southeast1.firebasedatabase.app/battery_status.json"

def is_battery_saver_on():
    try:
        # 0x0058 = SYSTEM_POWER_STATUS
        class SYSTEM_POWER_STATUS(ctypes.Structure):
            _fields_ = [
                ('ACLineStatus', ctypes.c_byte),
                ('BatteryFlag', ctypes.c_byte),
                ('BatteryLifePercent', ctypes.c_byte),
                ('SystemStatusFlag', ctypes.c_byte),
                ('BatteryLifeTime', ctypes.c_ulong),
                ('BatteryFullLifeTime', ctypes.c_ulong),
            ]

        status = SYSTEM_POWER_STATUS()
        if ctypes.windll.kernel32.GetSystemPowerStatus(ctypes.pointer(status)):
            return status.SystemStatusFlag == 1
    except Exception as e:
        print("Battery saver check failed:", e)
    return False

def get_battery_info():
    battery = psutil.sensors_battery()
    data = {
        "battery_percent": battery.percent,
        "plugged_in": battery.power_plugged,
        "timestamp": datetime.now().isoformat()
    }
    with open("battery_status.json", "w") as f:
        json.dump(data, f, indent=4)
    return data

def push_to_firebase(data):
    try:
        response = requests.put(FIREBASE_URL, json=data)
        print("Pushed to Firebase!", response.status_code)
    except Exception as e:
        print("Error pushing to Firebase:", e)

if __name__ == "__main__":
    data = get_battery_info()
    push_to_firebase(data)
