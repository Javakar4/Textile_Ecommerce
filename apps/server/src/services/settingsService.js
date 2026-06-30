import SystemSetting from "../models/SystemSetting.js";

let settingsCache = {};

export const settingsService = {
  /**
   * Initializes the settings cache by loading all settings from the database.
   */
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

  /**
   * Reads a setting value from the in-memory cache.
   * If not found, returns the provided default value.
   * @param {string} key 
   * @param {any} defaultValue 
   * @returns {any}
   */
  get(key, defaultValue = null) {
    if (settingsCache[key] !== undefined) {
      return settingsCache[key];
    }
    return defaultValue;
  },

  /**
   * Saves a setting value to the database and updates the in-memory cache.
   * @param {string} key 
   * @param {any} value 
   * @returns {Promise<any>}
   */
  async set(key, value) {
    settingsCache[key] = value;
    try {
      const setting = await SystemSetting.findOneAndUpdate(
        { key },
        { value },
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
