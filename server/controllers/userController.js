const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const PersonalInfo = require('../models/PersonalInfo');

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create the user
    const user = new User({
        email,
        password
    });

    // Create a new PersonalInfo document and link it to the user
    const personalInfo = new PersonalInfo({ user: user._id });
    user.personalInfo = personalInfo._id;

    // Save both documents
    await personalInfo.save();
    const createdUser = await user.save();

    if (createdUser) {
        const token = generateToken(createdUser._id);
        res.status(201).json({
            _id: createdUser._id,
            email: createdUser.email,
            personalInfo: createdUser.personalInfo, // Include personalInfo ID in the response
            token, // Include the token in the response
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
            __v: createdUser.__v
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password }); // Log the login attempt

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        console.log('Login successful for user:', user); // Log successful login
        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        console.log('Invalid email or password'); // Log invalid login attempt
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('personalInfo');

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            personalInfo: user.personalInfo,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            __v: user.__v
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            personalInfo: updatedUser.personalInfo,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            __v: updatedUser.__v
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Create or update personal information
// @route PUT /api/users/personalinfo
// @access Private
const updatePersonalInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        try {
            let personalInfo = await PersonalInfo.findOne({ user: req.user._id });

            if (!personalInfo) {
                personalInfo = new PersonalInfo({ user: req.user._id, ...req.body });
                await personalInfo.save();
                user.personalInfo = personalInfo._id;
                await user.save();
            } else {
                Object.assign(personalInfo, req.body);
                await personalInfo.save();
            }

            console.log(`User ${req.user._id} updated their personal info: `, personalInfo);

            res.json(personalInfo);
        } catch (error) {
            console.error('Error updating personal information:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get personal information
// @route GET /api/users/personalinfo
// @access Private
const getPersonalInfo = asyncHandler(async (req, res) => {
    const personalInfo = await PersonalInfo.findOne({ user: req.user._id });

    if (personalInfo) {
        res.json(personalInfo);
    } else {
        res.status(404);
        throw new Error('Personal information not found');
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).populate('personalInfo');
    res.json(users);
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      if (req.body.personalInfo) {
        let personalInfo = await PersonalInfo.findById(user.personalInfo);
  
        if (!personalInfo) {
          personalInfo = new PersonalInfo({ user: user._id, ...req.body.personalInfo });
          await personalInfo.save();
          user.personalInfo = personalInfo._id;
        } else {
          Object.assign(personalInfo, req.body.personalInfo);
          await personalInfo.save();
        }
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        personalInfo: updatedUser.personalInfo,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  // @desc Delete user
  // @route DELETE /api/users/:id
  // @access Private/Admin
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      await PersonalInfo.findByIdAndDelete(user.personalInfo);
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).populate('personalInfo');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Export the getUser function along with others
module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    updatePersonalInfo,
    getPersonalInfo,
    getUsers,
    updateUser,
    deleteUser,
    getUser, // Add this line
};