import {NextApiRequest, NextApiResponse} from 'next'
import {Timestamp} from 'mongodb'

import {connectToDatabase} from "@lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method, body} = req

    const {db} = await connectToDatabase()

    if (method === 'GET') {
        const posts = await db.collection('posts')
            .find()
            .sort({'_id': -1})
            .toArray()
            .then(posts => {
                return posts
            })
            .catch(error => res.status(500).json(error))
        res.status(200).json(posts)

    } else if (method === 'POST') {
        const post = await db.collection('posts')
            .insertOne({...body, timestamp: new Timestamp(32, 64)})
            .then(post => {
                return post
            })
            .catch(error => res.status(500).json(error))
        res.status(200).json(post)
    }
}

export default handler