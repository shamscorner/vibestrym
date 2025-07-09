import { Prisma } from '@/prisma/generated'

export const CATEGORIES: Prisma.CategoryCreateManyInput[] = [
	{
		title: 'Fan Q&A',
		slug: 'fan-qa',
		description:
			'Answer questions directly from your fans! This category is perfect for interacting with your audience, building stronger connections, and sharing insights about your life, work, or hobbies. Get to know your community better!',
		thumbnailUrl: '/categories/fan-qa.webp'
	},
	{
		title: 'Creative Collab',
		slug: 'creative-collab',
		description:
			"Collaborate with your fans on creative projects! Whether it's drawing, writing, music, or coding, this category allows you to create something amazing together. Inspire your audience and showcase their talents.",
		thumbnailUrl: '/categories/creative-collab.webp'
	},
	{
		title: 'Game Night',
		slug: 'game-night',
		description:
			'Play games with your viewers! This category is all about having fun and enjoying friendly competition with your community. Choose popular multiplayer games or discover hidden gems together.',
		thumbnailUrl: '/categories/game-night.webp'
	},
	{
		title: 'Tutorial Time',
		slug: 'tutorial-time',
		description:
			'Share your expertise and teach your fans new skills! This category is ideal for providing tutorials, workshops, and educational content. Help your audience learn and grow while showcasing your knowledge.',
		thumbnailUrl: '/categories/tutorial-time.webp'
	},
	{
		title: 'Live Reacts',
		slug: 'live-reacts',
		description:
			'React to videos, music, or other content live with your audience! This category is great for sharing your opinions, sparking discussions, and entertaining your viewers with your reactions.',
		thumbnailUrl: '/categories/live-reacts.webp'
	},
	{
		title: 'Behind the Scenes',
		slug: 'behind-the-scenes',
		description:
			'Give your fans an exclusive look behind the scenes of your life or work! This category allows you to share your daily routines, creative processes, and personal stories. Build a deeper connection with your audience.',
		thumbnailUrl: '/categories/behind-the-scenes.webp'
	},
	{
		title: 'Ask Me Anything',
		slug: 'ask-me-anything',
		description:
			'Open the floor for any and all questions from your fans! This category is perfect for candid conversations, personal insights, and building trust with your community. Be open, honest, and authentic.',
		thumbnailUrl: '/categories/ask-me-anything.webp'
	},
	{
		title: 'Challenge Accepted',
		slug: 'challenge-accepted',
		description:
			'Take on challenges suggested by your viewers! This category is all about pushing your limits, trying new things, and entertaining your audience with your attempts. Be creative, daring, and have fun!',
		thumbnailUrl: '/categories/challenge-accepted.webp'
	},
	{
		title: 'Story Time',
		slug: 'story-time',
		description:
			'Share personal stories, anecdotes, and experiences with your fans! This category is great for connecting with your audience on an emotional level, building empathy, and sharing valuable life lessons.',
		thumbnailUrl: '/categories/story-time.webp'
	},
	{
		title: 'Jam Session',
		slug: 'jam-session',
		description:
			'Play music and jam with your fans live! This category is perfect for musicians, singers, and music lovers who want to share their passion and create music together. Unleash your creativity and have fun!',
		thumbnailUrl: '/categories/jam-session.webp'
	},
	{
		title: 'Fitness Fun',
		slug: 'fitness-fun',
		description:
			'Workout and stay active with your viewers! This category is ideal for fitness enthusiasts who want to motivate others, share workout routines, and promote a healthy lifestyle. Get fit and have fun together!',
		thumbnailUrl: '/categories/fitness-fun.webp'
	},
	{
		title: 'Cooking Class',
		slug: 'cooking-class',
		description:
			'Cook delicious meals and share recipes with your fans! This category is perfect for foodies who want to inspire others, teach cooking techniques, and create culinary masterpieces together. Get cooking and have fun!',
		thumbnailUrl: '/categories/cooking-class.webp'
	},
	{
		title: 'Art Attack',
		slug: 'art-attack',
		description:
			'Create art and unleash your creativity with your viewers! This category is ideal for artists of all kinds who want to share their skills, inspire others, and create beautiful artwork together. Get creative and have fun!',
		thumbnailUrl: '/categories/art-attack.webp'
	},
	{
		title: 'Book Club',
		slug: 'book-club',
		description:
			'Discuss books and share your thoughts with your fans! This category is perfect for book lovers who want to connect with others, share their favorite reads, and explore new literary worlds together. Get reading and have fun!',
		thumbnailUrl: '/categories/book-club.webp'
	},
	{
		title: 'Travel Talk',
		slug: 'travel-talk',
		description:
			'Share your travel experiences and inspire your viewers to explore the world! This category is ideal for travelers who want to share their adventures, provide travel tips, and connect with other travel enthusiasts. Get traveling and have fun!',
		thumbnailUrl: '/categories/travel-talk.webp'
	},
	{
		title: 'Tech Talk',
		slug: 'tech-talk',
		description:
			'Discuss the latest tech trends and gadgets with your fans! This category is perfect for tech enthusiasts who want to share their knowledge, review products, and connect with other tech lovers. Get techy and have fun!',
		thumbnailUrl: '/categories/tech-talk.webp'
	},
	{
		title: 'Movie Night',
		slug: 'movie-night',
		description:
			'Watch movies together and share your thoughts with your viewers! This category is ideal for movie lovers who want to connect with others, discuss their favorite films, and discover new cinematic gems. Get watching and have fun!',
		thumbnailUrl: '/categories/movie-night.webp'
	},
	{
		title: 'Meditation Moment',
		slug: 'meditation-moment',
		description:
			'Practice mindfulness and meditation with your fans! This category is perfect for those who want to promote relaxation, reduce stress, and connect with others on a deeper level. Get mindful and have fun!',
		thumbnailUrl: '/categories/meditation-moment.webp'
	}
]
