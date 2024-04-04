import { URL } from "@/app/lib/Url";
import { useEffect, useState } from "react";

interface CommentPostProps {
    id: string;
    contentCommon: string;
    commentDateTime: string;
    accountCommentName: string;
    likeCount: number;
}
export default function CommentPost({ PostId }: { PostId: string }) {
    const [comments, setComments] = useState<CommentPostProps[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('');

    async function getComments() {
        try {
            const response = await fetch(`https://${URL}/CommentApi/GetListCommentByPostId/${PostId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        getComments();
    }, []);

    const handlePostComment = async () => {        
        if (comment) {
            try {
                const response = await fetch(`https://${URL}/CommentApi/CreateComment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        postRealEstateId: PostId,
                        contentCommon: comment
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                getComments();                
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
        }
    }

    const handleLike = async (commentId: string) => {
        try {
            const response = await fetch(`https://${URL}/LikeApi/LikeComment/${commentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            getComments();
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    }

    return (
        <div>
            <div className="pt-3">
                {token ? (
                    <>
                        <textarea placeholder="Write a comment..." className="border-2 p-2 w-full rounded-md" style={{ minHeight: '100px' }} onChange={(e) => setComment(e.target.value)}></textarea>
                        <div className="flex justify-end">
                            <button style={{ marginTop: '10px' }} className="p-2 bg-green-500 text-white rounded-lg" onClick={handlePostComment}>Post Comment</button>
                        </div>
                    </>
                ) : (
                    <p>Please login to comment on this post.</p>
                )}
            </div>
            <div className="space-y-3 border-2 p-2 rounded-md mt-5">
                {comments.map((comment, index) => (
                    <div key={index}>
                        <h3 className="font-semibold">{comment.accountCommentName}</h3>
                        <p>{comment.contentCommon}</p>
                        <p className="text-gray-500 text-sm">Posted on {comment.commentDateTime}</p>
                        <div className="flex justify-end items-center">
                            <button className="p-2 bg-green-500 text-white rounded-lg" onClick={() => handleLike(comment.id)}>Like</button>
                            <p className="ml-2">{comment.likeCount} likes</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}