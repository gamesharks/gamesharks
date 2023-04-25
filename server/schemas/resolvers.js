const { AuthenticationError } = require('apollo-server-express');
const { User, Fighters, Matchup, Betslip } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    fighters: async () => {
      return await Fighters.find();
    },
    matchups: async () => {

      return await Matchup.find().populate('fighters');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('betslips').populate('friends');

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    betslip: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('betslips');

        return user.betslips.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
