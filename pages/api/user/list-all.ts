import { User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, authOptions);

	if (!session || session.user.role === 0) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
		const users = await User.listAll();

		res.status(200).json({ message: users });
	} catch (err: any) {
		res.status(500).json({ error: 'Error in server' });
	}
}
