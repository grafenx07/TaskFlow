# TaskFlow - Video Demonstration Script

## 🎥 Recording Guidelines

**Duration:** 5-8 minutes
**Tool:** OBS Studio, Loom, or screen recorder of choice
**Resolution:** 1920x1080 (Full HD) recommended
**Audio:** Clear narration explaining each step

---

## 📝 Demo Script

### Introduction (30 seconds)

**Show:** Landing page or login screen

**Say:**
> "Hello! This is TaskFlow, a MERN stack application designed for efficient lead distribution among agents. The system allows admin users to manage agents and automatically distributes leads from uploaded CSV files using a round-robin algorithm. Let me walk you through the main features."

---

### Section 1: Admin Login (1 minute)

**Actions:**
1. Show login page
2. Enter credentials:
   - Email: `admin@taskflow.com`
   - Password: `admin123`
3. Click "Sign In"
4. Successfully redirect to dashboard

**Say:**
> "The application uses JWT-based authentication. I'm logging in with the admin credentials. The system securely validates the credentials against the MongoDB database and issues a JSON Web Token that expires after one hour."

**Show:**
- Professional login UI
- Successful authentication toast notification
- Redirect to dashboard

---

### Section 2: Dashboard Overview (45 seconds)

**Actions:**
1. Show dashboard with statistics
2. Point out key metrics:
   - Total Agents
   - Total Leads
   - Average per Agent
3. Show empty distribution table if starting fresh

**Say:**
> "Here's the main dashboard showing real-time statistics. Currently, we have [X] agents and [X] leads. The dashboard provides an at-a-glance view of the entire distribution system. Let me now create some agents."

---

### Section 3: Agent Creation (2 minutes)

**Actions:**
1. Navigate to "Agents" page
2. Click "+ Add Agent" button
3. Fill in first agent details:
   - Name: "John Smith"
   - Email: "john@example.com"
   - Phone: "+11234567890"
   - Password: "password123"
4. Click "Create Agent"
5. Show success notification
6. Repeat for 2-3 more agents (speed up recording or cut)
7. Show final agent list

**Say:**
> "Let's create our agents. I'm navigating to the Agents page and clicking Add Agent. The form validates all inputs - name must be at least 2 characters, email must be valid, phone requires a country code format, and password needs minimum 6 characters. Notice the system has a maximum limit of 5 agents."

**Show:**
- Form validation in action
- Success notifications
- Updated agent list with all details
- Try to add 6th agent and show limit error

**Say for 6th agent:**
> "See, when I try to add a 6th agent, the system prevents it because we've reached the maximum limit of 5 agents as per the requirements."

---

### Section 4: CSV Upload & Distribution (2.5 minutes)

**Actions:**
1. Navigate to "Upload CSV" page
2. Show the drag & drop area
3. Select or drag `sample-leads.csv` file
4. Show file information (name, size)
5. Click "Upload & Distribute"
6. Show processing
7. Show success message with distribution stats
8. Scroll to view distribution table

**Say:**
> "Now for the core feature - lead distribution. The application accepts CSV, XLSX, and XLS files with three fields: FirstName, Phone, and optional Notes. I'm uploading a sample CSV file with 25 leads."

**Show file contents briefly (optional):**
```
FirstName,Phone,Notes
John Smith,+11234567890,Interested...
Jane Doe,+14567891234,Follow up...
```

**After upload:**
> "The system has processed the file and distributed the 25 leads among our 5 agents using a round-robin algorithm. Each agent received exactly 5 leads. If we had 26 leads, the first agent would get 6, and the rest would get 5 - ensuring fair distribution."

---

### Section 5: View Distribution Details (1.5 minutes)

**Actions:**
1. Show distribution table with all agents
2. Click "View Leads" for first agent
3. Show modal with detailed lead information
4. Scroll through leads
5. Close modal
6. Click "View Leads" for another agent
7. Show different leads assigned

**Say:**
> "Let's examine how the leads were distributed. I'm clicking View Leads for John Smith. Here we can see all 5 leads assigned to him with their names, phone numbers, notes, and the date they were assigned. Each lead is automatically timestamped when assigned."

---

### Section 6: Dashboard Review (45 seconds)

**Actions:**
1. Navigate back to Dashboard
2. Show updated statistics:
   - 5 Agents
   - 25 Total Leads
   - 5 Average per Agent
3. Show distribution table with all agents and their lead counts

**Say:**
> "Let's return to the dashboard to see the updated statistics. We now have 5 agents with 25 distributed leads, showing an average of 5 leads per agent. The system maintains real-time synchronization across all pages."

---

### Section 7: Additional Features Demo (1 minute)

**Actions:**
1. Go back to Agents page
2. Click "Edit" on an agent
3. Update name or email
4. Show validation
5. Save changes
6. Show success

**Say:**
> "The application also supports full CRUD operations. I can edit an agent's information - though note that changing the email is validated for uniqueness. Agent passwords can only be set during creation for security reasons."

**Optional - Show Delete:**
7. Click "Delete" on an agent
8. Show confirmation dialog
9. Confirm deletion
10. Show agent removed with their leads preserved

**Say:**
> "I can also delete agents. Notice the system asks for confirmation. When an agent is deleted, their leads remain in the database but won't be displayed in the distribution anymore."

---

### Section 8: Error Handling Demo (30 seconds)

**Actions:**
1. Try to upload an invalid file (e.g., .txt or .pdf)
2. Show error message
3. Try to upload a CSV with missing required fields
4. Show validation errors

**Say:**
> "The system has comprehensive validation. Watch what happens when I try to upload an invalid file type - it's rejected. Similarly, if the CSV is missing required fields like FirstName or Phone, the system provides clear error messages."

---

### Conclusion (30 seconds)

**Actions:**
1. Click Logout
2. Return to login page

**Say:**
> "This completes the demonstration of TaskFlow. We've covered admin authentication, agent management with CRUD operations, CSV file upload with validation, automatic round-robin distribution, and real-time dashboard updates. The application is built with React, Node.js, Express, and MongoDB, following clean architecture principles and best practices. Thank you for watching!"

---

## ✅ Pre-Recording Checklist

- [ ] MongoDB is running
- [ ] Backend server is running (port 5000)
- [ ] Frontend is running (port 3000)
- [ ] Admin user is seeded
- [ ] sample-leads.csv is ready
- [ ] Browser window is maximized
- [ ] Close unnecessary tabs/notifications
- [ ] Good audio setup for narration
- [ ] Screen recorder is ready

---

## 🎬 Recording Tips

1. **Before Recording:**
   - Close all unnecessary applications
   - Clear browser cache and localStorage
   - Start fresh with empty data
   - Test audio levels

2. **During Recording:**
   - Speak clearly and at moderate pace
   - Move mouse slowly and deliberately
   - Pause briefly after each action
   - If you make a mistake, pause, then restart the section

3. **After Recording:**
   - Review the video
   - Check audio quality
   - Verify all features were demonstrated
   - Edit out long loading times if needed

---

## 📤 Upload Instructions

1. **Upload to Google Drive:**
   ```
   - Right-click video file
   - Upload to Google Drive
   - Right-click uploaded file → Share
   - Change to "Anyone with the link can view"
   - Copy link
   ```

2. **Share the Link:**
   - Add link to README.md or submit separately
   - Format: `[Video Demo](https://drive.google.com/file/d/YOUR_FILE_ID/view)`

---

## 📋 Demo Data Reference

**Admin Credentials:**
- Email: admin@taskflow.com
- Password: admin123

**Sample Agents:**
```
Agent 1: John Smith, john@example.com, +11234567890
Agent 2: Jane Doe, jane@example.com, +14567891234
Agent 3: Mike Johnson, mike@example.com, +15551234567
Agent 4: Sarah Williams, sarah@example.com, +12223334444
Agent 5: Tom Brown, tom@example.com, +19998887777
```

**CSV File:** `sample-leads.csv` (provided in root directory)

---

**Good luck with your recording! 🎥🚀**
