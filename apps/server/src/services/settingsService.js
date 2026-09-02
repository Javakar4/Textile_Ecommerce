import SystemSetting from "../models/SystemSetting.js";

let settingsCache = {};

export const settingsService = {
  
  async initialize() {
    try {
      const settings = await SystemSetting.find({});
      settingsCache = {};
      for (const setting of settings) {
        settingsCache[setting.key] = setting.value;
      }
      console.log("⚙️ System settings initialized successfully.");
    } catch (error) {
      console.error("❌ Failed to initialize system settings cache:", error);
    }
  },

  get(key, defaultValue = null) {
    if (settingsCache[key] !== undefined) {
      return settingsCache[key];
    }
    console.log(defaultValue, "default value")
    return defaultValue;
  },


  async set(key, value) {
    settingsCache[key] = value;
    try {
      const setting = await SystemSetting.findOneAndUpdate(
        { key },
        { $set: { value } },
        { upsert: true, new: true }
      );
      return setting.value;
    } catch (error) {
      console.error(`❌ Failed to persist system setting '${key}':`, error);
      throw error;
    }
  }
};

export default settingsService;
