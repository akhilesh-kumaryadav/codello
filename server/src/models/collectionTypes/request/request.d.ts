import { Document, Types } from "mongoose";

export type RequestSchema = {
    fromUserId: Types.ObjectId;
    toUserId: Types.ObjectId;
    status: 'interested' | 'ignored' | 'accepted' | 'rejected';
}

export type RequestDocument = Document & RequestSchema