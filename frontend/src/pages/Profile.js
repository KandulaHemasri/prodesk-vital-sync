import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAppointments } from "../services/appointmentService";
import { updateUserProfile } from "../services/patientService";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({ age: "", gender: "" });
  const [isSaving, setIsSaving] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Get age and gender - check both user.user and user level
  const userAge = user?.user?.age || user?.age;
  const userGender = user?.user?.gender || user?.gender;
  const displayAge = userAge && userAge !== null ? userAge : "Not provided";
  const displayGender = userGender && userGender !== null ? userGender : "Not provided";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // Initialize edit form with current values
    if (userAge || userGender) {
      setEditFormData({
        age: userAge || "",
        gender: userGender || "",
      });
    }
  }, [user, navigate, userAge, userGender]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const profileData = {
        age: editFormData.age ? parseInt(editFormData.age) : null,
        gender: editFormData.gender || null,
      };
      console.log("Sending profile update:", profileData);
      
      const updatedUser = await updateUserProfile(profileData);
      console.log("Update response:", updatedUser);

      // Update localStorage
      const storedUser = user.user || user;
      const updatedStorageData = {
        token: user.token,
        user: {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
          age: updatedUser.age ?? null,
          gender: updatedUser.gender ?? null,
        },
      };
      console.log("Updating localStorage with:", updatedStorageData);
      localStorage.setItem("user", JSON.stringify(updatedStorageData));

      toast.success("Profile updated successfully! ✅");
      setIsEditingProfile(false);
      // Small delay before reload to show success message
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apptsData = await getAppointments().catch(() => []);
        setAppointments(apptsData || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((appt) => new Date(appt.date) >= new Date());
  }, [appointments]);

  const previousAppointments = useMemo(() => {
    return appointments.filter((appt) => new Date(appt.date) < new Date());
  }, [appointments]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading Profile...</h2>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.user?.name?.charAt(0) || user?.name?.charAt(0)}
          </div>
          <div className="profile-info">
            <h1>{user?.user?.name || user?.name}</h1>
            <p className="profile-email">{user?.user?.email || user?.email}</p>
            <div className="profile-details">
              {!isEditingProfile ? (
                <>
                  <span className="detail-item">
                    <strong>Age:</strong> {displayAge}
                  </span>
                  <span className="detail-item">
                    <strong>Gender:</strong> {displayGender}
                  </span>
                  <button className="edit-profile-btn" onClick={() => setIsEditingProfile(true)}>
                    ✏️ Edit Profile
                  </button>
                </>
              ) : (
                <div className="edit-profile-form">
                  <div className="edit-form-group">
                    <label>Age:</label>
                    <input
                      type="number"
                      value={editFormData.age}
                      onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                      min="1"
                      max="120"
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Gender:</label>
                    <select
                      value={editFormData.gender}
                      onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="edit-form-buttons">
                    <button
                      className="save-btn"
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setIsEditingProfile(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <section className="profile-section">
            <div className="section-title">
              <h2>Upcoming Appointments</h2>
              <span className="count-badge">{upcomingAppointments.length}</span>
            </div>
            <div className="appointments-container">
              {upcomingAppointments.length ? (
                upcomingAppointments.map((appt) => (
                  <div key={appt._id} className="appointment-item">
                    <div className="appt-header">
                      <h3>{appt.doctorName}</h3>
                      <span className="status upcoming">Upcoming</span>
                    </div>
                    <p className="appt-date">
                      <strong>Date:</strong> {appt.date}
                    </p>
                    <p className="appt-time">
                      <strong>Time:</strong> {appt.time}
                    </p>
                    <p className="appt-reason">
                      <strong>Reason:</strong> {appt.reason}
                    </p>
                  </div>
                ))
              ) : (
                <div className="empty-message">No upcoming appointments scheduled.</div>
              )}
            </div>
          </section>

          <section className="profile-section">
            <div className="section-title">
              <h2>Previous Appointments</h2>
              <span className="count-badge">{previousAppointments.length}</span>
            </div>
            <div className="appointments-container">
              {previousAppointments.length ? (
                previousAppointments.map((appt) => (
                  <div key={appt._id} className="appointment-item">
                    <div className="appt-header">
                      <h3>{appt.doctorName}</h3>
                      <span className="status completed">Completed</span>
                    </div>
                    <p className="appt-date">
                      <strong>Date:</strong> {appt.date}
                    </p>
                    <p className="appt-time">
                      <strong>Time:</strong> {appt.time}
                    </p>
                    <p className="appt-reason">
                      <strong>Reason:</strong> {appt.reason}
                    </p>
                  </div>
                ))
              ) : (
                <div className="empty-message">No previous appointments.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
