import {NextApiRequest, NextApiResponse} from 'next'
import {ObjectId} from 'mongodb'
import {connectToDatabase} from "@lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {query: {id}, method} = req

    const {db} = await connectToDatabase()

    if (method === 'DELETE') {
        const response = await db.collection('posts')
            .deleteOne({_id: new ObjectId(id as string)})
            .then(res => res)
            .catch(error => res.status(500).json(error))
        res.status(200).json(response)
    }
}

export default handler