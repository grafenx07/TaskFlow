# TaskFlow - Testing Guide

## 🧪 Comprehensive Testing Checklist

This guide helps you systematically test all features of the TaskFlow application.

---

## 1️⃣ Authentication Testing

### ✅ Login Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Valid login | Enter correct email & password | Login successful, redirect to dashboard | ☐ |
| Invalid email | Enter wrong email | Error: "Invalid credentials" | ☐ |
| Invalid password | Enter wrong password | Error: "Invalid credentials" | ☐ |
| Empty fields | Submit with empty fields | Validation errors shown | ☐ |
| Invalid email format | Enter "notanemail" | Error: "Please provide a valid email" | ☐ |
| Token persistence | Login, refresh page | User stays logged in | ☐ |
| Logout | Click logout button | Redirect to login page | ☐ |
| Protected routes | Access /agents without login | Redirect to login page | ☐ |

---

## 2️⃣ Agent Management Testing

### ✅ Create Agent Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Valid agent creation | Fill all fields correctly | Agent created successfully | ☐ |
| Duplicate email | Create agent with existing email | Error: "Email already exists" | ☐ |
| Name too short | Enter 1 character name | Error: "Name must be at least 2 characters" | ☐ |
| Invalid email | Enter invalid email | Validation error | ☐ |
| Invalid phone format | Enter phone without country code | Error: Phone validation fails | ☐ |
| Valid phone formats | Test: +1234567890, +911234567890 | All accepted | ☐ |
| Password too short | Enter 5 character password | Error: "Minimum 6 characters" | ☐ |
| Maximum limit | Try creating 6th agent | Error: "Maximum limit of 5 agents reached" | ☐ |
| Empty required fields | Submit with missing fields | Validation errors for each field | ☐ |

### ✅ Read Agent Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| List all agents | Navigate to Agents page | All agents displayed correctly | ☐ |
| Agent details | Check displayed information | Name, email, phone, lead count shown | ☐ |
| Empty state | Delete all agents | "No agents found" message | ☐ |
| Lead count accuracy | Compare with distribution | Numbers match | ☐ |

### ✅ Update Agent Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Update name | Change agent name | Update successful | ☐ |
| Update email | Change to new email | Update successful | ☐ |
| Update phone | Change phone number | Update successful | ☐ |
| Duplicate email on update | Change to existing email | Error: Email already exists | ☐ |
| Invalid data update | Enter invalid phone | Validation error | ☐ |
| Cancel update | Click cancel button | Modal closes, no changes | ☐ |
| Password not editable | Check edit form | Password field not present | ☐ |

### ✅ Delete Agent Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Delete agent | Click delete, confirm | Agent deleted successfully | ☐ |
| Delete confirmation | Click delete | Confirmation dialog appears | ☐ |
| Cancel deletion | Click delete, then cancel | Agent not deleted | ☐ |
| Leads after deletion | Check distribution after delete | Leads remain in database | ☐ |

---

## 3️⃣ File Upload Testing

### ✅ File Format Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| CSV upload | Upload .csv file | File accepted | ☐ |
| XLSX upload | Upload .xlsx file | File accepted | ☐ |
| XLS upload | Upload .xls file | File accepted | ☐ |
| Invalid format - PDF | Try uploading .pdf | Error: "Only CSV, XLSX, XLS allowed" | ☐ |
| Invalid format - TXT | Try uploading .txt | Error: File rejected | ☐ |
| Invalid format - Image | Try uploading .jpg | Error: File rejected | ☐ |
| File size limit | Upload 6MB file | Error: File too large (if > 5MB) | ☐ |
| Empty file | Upload empty CSV | Error: "File is empty" | ☐ |

### ✅ CSV Structure Tests

| Test Case | CSV Content | Expected Result | Status |
|-----------|-------------|----------------|---------|
| Valid CSV | FirstName,Phone,Notes with data | Success | ☐ |
| Missing FirstName column | Phone,Notes only | Error: Missing FirstName | ☐ |
| Missing Phone column | FirstName,Notes only | Error: Missing Phone | ☐ |
| Missing Notes (optional) | FirstName,Phone only | Success (Notes empty) | ☐ |
| Case insensitive columns | firstname,phone,notes | Success (normalized) | ☐ |
| Empty FirstName value | Row with empty first name | Error: Row validation fails | ☐ |
| Empty Phone value | Row with empty phone | Error: Row validation fails | ☐ |
| Special characters | Names/notes with special chars | Success | ☐ |

---

## 4️⃣ Distribution Algorithm Testing

### ✅ Round-Robin Distribution Tests

| Test Case | Agents | Leads | Expected Distribution | Status |
|-----------|--------|-------|----------------------|---------|
| Equal division | 5 | 25 | Each gets 5 | ☐ |
| Remainder case 1 | 5 | 26 | 6,5,5,5,5 | ☐ |
| Remainder case 2 | 5 | 13 | 3,3,3,2,2 | ☐ |
| Fewer leads | 5 | 3 | 1,1,1,0,0 | ☐ |
| Single lead | 5 | 1 | 1,0,0,0,0 | ☐ |
| More leads than agents | 3 | 10 | 4,3,3 | ☐ |
| Single agent | 1 | 20 | 20 | ☐ |
| Two agents | 2 | 7 | 4,3 | ☐ |

### ✅ Multiple Upload Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Sequential uploads | Upload 2 files consecutively | All leads added to agents | ☐ |
| Lead accumulation | Check lead count after 2 uploads | Counts increase correctly | ☐ |
| No duplicate leads | Upload same file twice | All leads added (no duplication check) | ☐ |

---

## 5️⃣ Dashboard Testing

### ✅ Statistics Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Total agents count | Create 3 agents | Shows "3" | ☐ |
| Total leads count | Upload 15 leads | Shows "15" | ☐ |
| Average calculation | 15 leads, 3 agents | Shows "5" | ☐ |
| Real-time update | Upload file from another page | Dashboard updates | ☐ |
| Distribution table | Check agent list | All agents with lead counts shown | ☐ |
| Empty state | No agents created | Appropriate message displayed | ☐ |

---

## 6️⃣ UI/UX Testing

### ✅ Navigation Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Dashboard navigation | Click "Dashboard" in nav | Navigate to dashboard | ☐ |
| Agents navigation | Click "Agents" in nav | Navigate to agents page | ☐ |
| Upload navigation | Click "Upload CSV" in nav | Navigate to upload page | ☐ |
| Active page indicator | Navigate to each page | Current page highlighted in nav | ☐ |
| Logo click | Click logo | Return to dashboard | ☐ |

### ✅ Responsive Design Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Mobile view | Resize to 375px width | UI adapts properly | ☐ |
| Tablet view | Resize to 768px width | UI looks good | ☐ |
| Desktop view | Full screen (1920px) | UI utilizes space well | ☐ |
| Table scrolling | View on mobile | Tables scroll horizontally | ☐ |

### ✅ Form Interaction Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Focus states | Tab through form fields | Clear focus indicators | ☐ |
| Error messages | Submit invalid form | Clear error messages | ☐ |
| Success notifications | Complete any action | Toast notification appears | ☐ |
| Modal overlay | Open any modal | Background dimmed, clickable to close | ☐ |
| Modal close | Click X or outside | Modal closes | ☐ |
| Loading states | Submit form | Loading indicator shown | ☐ |
| Disabled states | After max agents | Button disabled with message | ☐ |

---

## 7️⃣ Error Handling Testing

### ✅ Backend Error Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| MongoDB disconnected | Stop MongoDB, try action | Error message displayed | ☐ |
| Backend down | Stop backend, try action | Error message displayed | ☐ |
| Network error | Disconnect internet, try action | Error message shown | ☐ |
| Invalid token | Manually modify JWT | Redirect to login | ☐ |
| Token expiration | Wait 1 hour, try action | Redirect to login | ☐ |
| Server 500 error | Trigger server error | User-friendly error message | ☐ |

---

## 8️⃣ Security Testing

### ✅ Authentication Security

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Password hashing | Check DB after agent creation | Password is hashed | ☐ |
| JWT in localStorage | Check browser storage | Token stored securely | ☐ |
| Protected routes | Access /agents without token | Redirect to login | ☐ |
| Token in headers | Check network requests | Bearer token in Authorization header | ☐ |
| Logout clears token | Logout, check localStorage | Token removed | ☐ |

### ✅ Input Validation

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| SQL injection attempt | Enter SQL in form fields | Sanitized/rejected | ☐ |
| XSS attempt | Enter `<script>` in fields | Escaped properly | ☐ |
| Very long input | Enter 10000 character string | Validation rejects | ☐ |

---

## 9️⃣ Performance Testing

### ✅ Load Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|----------------|---------|
| Large CSV upload | Upload file with 1000 rows | Processes successfully | ☐ |
| Multiple agents with many leads | 5 agents, 500 leads each | UI remains responsive | ☐ |
| Rapid clicks | Click button multiple times | No duplicate actions | ☐ |
| Page load time | Measure initial load | Under 3 seconds | ☐ |

---

## 🎯 Test Execution Summary

**Total Tests:** ___ / ___
**Passed:** ___
**Failed:** ___
**Blocked:** ___

### Critical Issues Found:
1.
2.
3.

### Minor Issues Found:
1.
2.
3.

### Recommendations:
1.
2.
3.

---

## 🔧 Testing Tools

### Manual Testing
- Browser: Chrome/Firefox/Safari
- Developer Tools: Console, Network tab
- MongoDB Compass: Database inspection

### Automated Testing (Future)
- Jest: Unit tests
- React Testing Library: Component tests
- Supertest: API tests
- Cypress: E2E tests

---

## 📝 Bug Report Template

```
**Title:** [Concise description]

**Priority:** Critical / High / Medium / Low

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**


**Actual Result:**


**Environment:**
- OS:
- Browser:
- Node version:
- MongoDB version:

**Screenshots/Logs:**

```

---

**Testing completed on:** ___________
**Tested by:** ___________
**Sign-off:** ___________
