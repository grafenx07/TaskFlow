import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Lead schema - embedded within Agent
const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    assignedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: true // Leads get their own _id for easier updates
  }
);

// Agent schema
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Agent name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        'Please provide a valid phone number with country code'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't include password in queries by default
    },
    leads: [leadSchema], // Embedded leads array
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
agentSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Virtual field for lead count
agentSchema.virtual('leadCount').get(function () {
  return this.leads.length;
});

// Ensure virtuals are included in JSON
agentSchema.set('toJSON', { virtuals: true });
agentSchema.set('toObject', { virtuals: true });

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
