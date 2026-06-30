import { config } from '../config/config.js';

const BASE_URL = `http://localhost:${config.PORT || 4000}`;

async function runTests() {
  console.log("🧪 Starting settings and maintenance mode integration tests...");
  let adminToken = '';
  let userToken = '';

  // 1. Log in as admin
  try {
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    if (!loginData.success) {
      throw new Error(`Admin login failed: ${loginData.message}`);
    }
    adminToken = loginData.data.token;
    console.log("✅ Admin logged in successfully. Token acquired.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 2. Log in as regular user
  try {
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    if (!loginData.success) {
      throw new Error(`User login failed: ${loginData.message}`);
    }
    userToken = loginData.data.token;
    console.log("✅ Regular user logged in successfully. Token acquired.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 3. Get Maintenance Mode status
  try {
    const res = await fetch(`${BASE_URL}/api/v1/settings/maintenance`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data = await res.json();
    console.log("🔍 Initial Maintenance Mode Status:", data.data);
  } catch (err) {
    console.error("❌ Failed to get initial maintenance status:", err.message);
  }

  // 4. Activate Maintenance Mode
  try {
    const res = await fetch(`${BASE_URL}/api/v1/settings/maintenance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ enabled: true })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Failed to activate maintenance mode: ${data.message}`);
    }
    console.log("✅ Maintenance Mode activated dynamically.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 5. Verify non-admin request is blocked with 503
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    if (res.status !== 503) {
      throw new Error(`Expected status 503 for non-admin request, but got ${res.status}`);
    }
    console.log("✅ Non-admin public request was blocked with 503 Service Unavailable:", data.message);
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 6. Verify regular user is blocked with 503
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const data = await res.json();
    if (res.status !== 503) {
      throw new Error(`Expected status 503 for regular user request, but got ${res.status}`);
    }
    console.log("✅ Authenticated regular user request was blocked with 503 Service Unavailable:", data.message);
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 7. Verify admin request bypasses maintenance mode
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (res.status !== 200) {
      throw new Error(`Expected status 200 for admin user bypass, but got ${res.status}`);
    }
    console.log("✅ Admin user bypassed maintenance mode successfully (200 OK).");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 8. Test Admin password change
  try {
    const res = await fetch(`${BASE_URL}/api/v1/settings/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ currentPassword: 'password123', newPassword: 'newpassword123' })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Failed to change admin password: ${data.message}`);
    }
    console.log("✅ Admin password updated successfully to 'newpassword123'.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 9. Verify login with old password fails
  try {
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    if (loginRes.status === 200) {
      throw new Error("Login succeeded with old password after change!");
    }
    console.log("✅ Login with old password rejected successfully:", loginData.message);
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 10. Verify login with new password succeeds
  let newAdminToken = '';
  try {
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'newpassword123' })
    });
    const loginData = await loginRes.json();
    if (!loginData.success) {
      throw new Error(`Login failed with new password: ${loginData.message}`);
    }
    newAdminToken = loginData.data.token;
    console.log("✅ Login with new password succeeded. Token acquired.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 11. Reset admin password back to 'password123' (Clean up)
  try {
    const res = await fetch(`${BASE_URL}/api/v1/settings/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newAdminToken}`
      },
      body: JSON.stringify({ currentPassword: 'newpassword123', newPassword: 'password123' })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Failed to restore admin password: ${data.message}`);
    }
    console.log("✅ Admin password restored back to 'password123'.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 12. Deactivate Maintenance Mode (Clean up)
  try {
    const res = await fetch(`${BASE_URL}/api/v1/settings/maintenance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newAdminToken}`
      },
      body: JSON.stringify({ enabled: false })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Failed to deactivate maintenance mode: ${data.message}`);
    }
    console.log("✅ Maintenance Mode deactivated dynamically.");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  // 13. Verify normal request is now allowed (200)
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    if (res.status !== 200) {
      throw new Error(`Expected status 200 for public request after deactivating maintenance, but got ${res.status}`);
    }
    console.log("✅ Public request succeeded after deactivating maintenance mode (200 OK).");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
    process.exit(1);
  }

  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Settings module features are working perfectly.");
}

runTests();
