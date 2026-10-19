'use client';

import { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Pencil, 
  Send 
} from 'lucide-react';
import Button from './Button';
import CreatePostModal from './CreatePostModal';
import { upvotePost, addPostComment, createCommunityPost } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { SECTORS } from '@/lib/data';

export default function CommunityFeed({ initialPosts = [] }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [posts, setPosts] = useState(initialPosts);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const handleUpvote = async (postId) => {
    try {
      await upvotePost(postId);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
      );
      showToast('Upvoted post!');
    } catch {
      //
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    try {
      const authorName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Founder');
      const newComment = await addPostComment(postId, {
        user_id: user?.id || 'usr_guest',
        author_name: authorName,
        body: text.trim()
      });

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const comments = p.comments || [];
            return {
              ...p,
              comments: [...comments, newComment],
              comment_count: comments.length + 1
            };
          }
          return p;
        })
      );

      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      showToast('Comment submitted!');
    } catch {
      showToast('Failed to add comment', 'error');
    }
  };

  const handleCreatePost = async (postData) => {
    const authorName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Founder');
    const created = await createCommunityPost({
      ...postData,
      user_id: user?.id || 'usr_guest',
      author_name: authorName
    });
    setPosts((prev) => [created, ...prev]);
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedType !== 'all' && p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    if (selectedSector !== 'all' && p.sector?.toLowerCase() !== selectedSector.toLowerCase()) return false;
    return true;
  });

  const getPostBadge = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('question')) {
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-900">
          QUESTION
        </span>
      );
    }
    if (t.includes('success')) {
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-950 text-green-400 border border-green-900">
          SUCCESS
        </span>
      );
    }
    // Default to SOURCE / RESOURCE badge style
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A]">
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Create Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Post type filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Discussions' },
            { id: 'question', label: 'Questions' },
            { id: 'idea', label: 'Idea Showcase' },
            { id: 'success', label: 'Success Stories' },
            { id: 'resource', label: 'Weekly Resources' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedType(tab.id)}
              className={`rounded-lg px-4 py-1.5 text-sm transition whitespace-nowrap ${
                selectedType === tab.id
                  ? 'bg-white text-black font-medium'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sector dropdown & Create Post Button */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-white focus:border-white focus:outline-none transition cursor-pointer"
          >
            <option value="all">All Sectors</option>
            {SECTORS.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>

          <Button
            variant="primary"
            onClick={() => setCreateModalOpen(true)}
            className="gap-2 shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </Button>
        </div>
      </div>

      {/* Posts Feed: Consistent vertical rhythm gap-0 between cards, divider handles spacing */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden divide-y divide-[#1F1F1F]">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#888888]">
            No posts found for the selected filters.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = Boolean(expandedComments[post.id]);

            return (
              <div 
                key={post.id} 
                className="p-5 border-b border-[#1F1F1F] last:border-b-0 space-y-3"
              >
                {/* Author + Timestamp & Post Type Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-[#555555] flex items-center gap-2">
                    <span className="font-medium text-white">{post.author_name}</span>
                    <span>•</span>
                    <span>{post.sector || 'General'}</span>
                    <span>•</span>
                    <span>{post.region || 'All India'}</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>

                  <div>
                    {getPostBadge(post.type)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white leading-snug mt-1">
                  {post.title}
                </h3>

                {/* Body: text-sm text-[#888] leading-relaxed mt-1 line-clamp-2 */}
                <p className="text-sm text-[#888888] leading-relaxed mt-1 line-clamp-2 whitespace-pre-line">
                  {post.body}
                </p>

                {/* Footer row: upvotes + replies count in text-xs text-[#555], Verified Founder Thread badge right-aligned */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#555555]">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleUpvote(post.id)}
                      className="flex items-center gap-1.5 hover:text-white transition cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({ ...prev, [post.id]: !isCommentsOpen }))
                      }
                      className="flex items-center gap-1.5 hover:text-white transition cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comment_count || (post.comments?.length || 0)} Replies</span>
                    </button>
                  </div>

                  <span className="text-xs text-[#555555]">
                    Verified Founder Thread
                  </span>
                </div>

                {/* Expanded Comments Thread */}
                {isCommentsOpen && (
                  <div className="pt-3 mt-3 border-t border-[#1F1F1F] space-y-3">
                    <div className="space-y-2">
                      {post.comments?.map((c, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-white">{c.author_name}</span>
                            <span className="text-[#555555]">
                              {new Date(c.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#888888] leading-relaxed">{c.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add reply input */}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write your response..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] text-xs focus:border-white focus:outline-none"
                      />
                      <Button
                        variant="primary"
                        onClick={() => handleAddComment(post.id)}
                        className="gap-1.5 text-xs shrink-0 py-2"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <CreatePostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

