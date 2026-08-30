import iphoneImage from '../assets/ChatGPT Image Aug 19, 2026, 01_40_53 PM.png'
import watchImage from '../assets/ChatGPT Image Aug 19, 2026, 01_55_25 PM.png'
import airpodsImage from '../assets/ChatGPT Image Aug 19, 2026, 02_06_07 PM.png'

export const giveawayStats = {
  totalGiveaways: '24',
  participants: '8,500+',
  prizesWon: '1,200+',
}

export const winnerAnnouncements = [
  {
    maskedUserId: 'VE****21',
    prize: 'iPhone 15 Pro',
  },
  {
    maskedUserId: 'VE****83',
    prize: 'Apple Watch',
  },
  {
    maskedUserId: 'VE****54',
    prize: 'AirPods Pro',
  },
  {
    maskedUserId: 'VE****92',
    prize: 'Amazon Gift Card',
  },
]

export const currentWinners = [
  {
    id: 'winner-001',
    maskedUserId: 'VE****21',
    displayName: 'Alex M.',
    prize: 'iPhone 15 Pro',
    giveaway: 'Tech Giveaway',
    status: 'REWARDED',
    isWinner: true,
    prizeType: 'PHYSICAL',
  },
  {
    id: 'winner-002',
    maskedUserId: 'VE****83',
    displayName: 'Priya S.',
    prize: 'Apple Watch',
    giveaway: 'Smart Wearable',
    status: 'REWARDED',
    isWinner: false,
    prizeType: 'PHYSICAL',
  },
  {
    id: 'winner-003',
    maskedUserId: 'VE****54',
    displayName: 'Daniel R.',
    prize: 'AirPods Pro',
    giveaway: 'Audio Giveaway',
    status: 'REWARDED',
    isWinner: false,
    prizeType: 'PHYSICAL',
  },
]

export const previousWinners = [
  {
    id: 'previous-001',
    maskedUserId: 'VE****92',
    displayName: 'Demo Winner',
    prize: 'Amazon Gift Card',
    giveaway: 'Rewards Giveaway',
    status: 'REWARDED',
    isWinner: true,
    prizeType: 'GIFT_CARD',
  },
]

export const featuredGiveaways = [
  {
    id: 1,
    slug: 'iphone-15-pro',
    title: 'iPhone 15 Pro',
    category: 'Tech Giveaway',
    description:
      'Get a chance to win the powerful iPhone 15 Pro through the VELOOP Rewards giveaway.',
    image: iphoneImage,
    prizeValue: '$999',
    winners: 1,
    participants: 2847,
    maxEntries: 5000,
    entryFee: 250,
    currency: 'VEs',
    status: 'ACTIVE',
    featured: true,
    startAt: '2026-08-30T00:00:00',
    endAt: '2026-09-15T23:59:59',
    eligibilitySummary: 'Open to verified VELOOP members with a valid wallet and KYC-ready profile.',
  },

  {
    id: 2,
    slug: 'apple-watch',
    title: 'Apple Watch',
    category: 'Smart Wearable',
    description:
      'Join this giveaway and get a chance to take home a premium Apple Watch.',
    image: watchImage,
    prizeValue: '$399',
    winners: 1,
    participants: 1642,
    maxEntries: 3000,
    entryFee: 200,
    currency: 'VEs',
    status: 'UPCOMING',
    featured: true,
    startAt: '2026-09-01T00:00:00',
    endAt: '2026-09-20T23:59:59',
    eligibilitySummary: 'Member eligibility is being finalized for this launch campaign.',
  },

  {
    id: 3,
    slug: 'airpods',
    title: 'AirPods Pro',
    category: 'Audio',
    description:
      'Enter for a chance to win premium wireless audio with AirPods Pro.',
    image: airpodsImage,
    prizeValue: '$249',
    winners: 1,
    participants: 2180,
    maxEntries: 3500,
    entryFee: 500,
    currency: 'SVEs',
    status: 'ACTIVE',
    featured: true,
    startAt: '2026-08-30T00:00:00',
    endAt: '2026-10-05T23:59:59',
    eligibilitySummary: 'Open to members with active SVE membership and a verified account.',
  },

  {
    id: 4,
    slug: 'amazon-2000',
    title: 'Amazon ₹2,000',
    category: 'Gift Card',
    description:
      'Win an Amazon gift card worth ₹2,000 and redeem it for your next shopping spree.',
    image: iphoneImage,
    prizeValue: '₹2,000',
    winners: 1,
    participants: 3120,
    maxEntries: 4500,
    entryFee: 500,
    currency: 'VEs',
    status: 'ACTIVE',
    featured: false,
    startAt: '2026-08-30T00:00:00',
    endAt: '2026-09-25T23:59:59',
    eligibilitySummary: 'Open to eligible members residing in supported regions with active participation status.',
  },

  {
    id: 5,
    slug: 'amazon-500',
    title: 'Amazon ₹500',
    category: 'Gift Card',
    description:
      'Claim a smaller Amazon reward with a quick entry and simple claim process.',
    image: watchImage,
    prizeValue: '₹500',
    winners: 1,
    participants: 1968,
    maxEntries: 2800,
    entryFee: 300,
    currency: 'VEs',
    status: 'ENDED',
    featured: false,
    startAt: '2026-07-05T00:00:00',
    endAt: '2026-08-25T23:59:59',
    eligibilitySummary: 'Closed giveaway with winners announced after the final selection window.',
  },

  {
    id: 6,
    slug: 'amazon-20',
    title: 'Amazon ₹20',
    category: 'Reward Drop',
    description:
      'A lightweight reward draw designed for token holders and frequent community members.',
    image: airpodsImage,
    prizeValue: '₹20',
    winners: 2,
    participants: 4250,
    maxEntries: 5200,
    entryFee: 2000,
    currency: 'Tokens',
    status: 'UPCOMING',
    featured: false,
    startAt: '2026-09-15T00:00:00',
    endAt: '2026-09-30T23:59:59',
    eligibilitySummary: 'Token balances and account activity requirements apply to qualifying members.',
  },
]