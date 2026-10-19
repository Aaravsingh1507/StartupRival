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
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0866F5]/20 text-[#39BAFF] border border-[#39BAFF]/40">
          QUESTION
        </span>
      );
    }
    if (t.includes('success')) {
      return (
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-950/70 text-green-400 border border-green-500/40">
          SUCCESS
        </span>
      );
    }
    return (
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0C1E3D] text-[#8EABCF] border border-[#39BAFF]/20">
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Create Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Post type filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
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
              className={`rounded-xl px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
                  : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
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
            className="bg-[#030712]/90 border border-[#39BAFF]/25 rounded-xl px-3.5 py-2 text-sm text-[#F4F8FF] focus:border-[#39BAFF] focus:outline-none transition cursor-pointer"
          >
            <option value="all">All Sectors</option>
            {SECTORS.map((s) => (
              <option key={s.id} value={s.name} className="bg-[#08152B] text-white">{s.name}</option>
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

      {/* Posts Feed */}
      <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 rounded-2xl overflow-hidden divide-y divide-[#39BAFF]/15 shadow-[0_12px_45px_rgba(3,7,18,0.5)]">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#8EABCF]">
            No posts found for the selected filters.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = Boolean(expandedComments[post.id]);

            return (
              <div 
                key={post.id} 
                className="p-6 space-y-3 hover:bg-[#0C1E3D]/30 transition"
              >
                {/* Author + Timestamp & Post Type Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-[#8EABCF] flex items-center gap-2">
                    <span className="font-semibold text-[#F4F8FF]">{post.author_name}</span>
                    <span>•</span>
                    <span className="text-[#39BAFF]">{post.sector || 'General'}</span>
                    <span>•</span>
                    <span>{post.region || 'All India'}</span>
                    <span>•</span>
                    <span className="text-[#4B6485] font-mono">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>

                  <div>
                    {getPostBadge(post.type)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#F4F8FF] leading-snug mt-1">
                  {post.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-[#8EABCF] leading-relaxed mt-1 line-clamp-2 whitespace-pre-line">
                  {post.body}
                </p>

                {/* Footer row: upvotes + replies count */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#8EABCF]">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleUpvote(post.id)}
                      className="flex items-center gap-1.5 hover:text-[#39BAFF] transition cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#39BAFF]" />
                      <span className="font-mono">{post.upvotes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({ ...prev, [post.id]: !isCommentsOpen }))
                      }
                      className="flex items-center gap-1.5 hover:text-[#39BAFF] transition cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#39BAFF]" />
                      <span>{post.comment_count || (post.comments?.length || 0)} Replies</span>
                    </button>
                  </div>

                  <span className="text-xs text-[#4B6485]">
                    Verified Founder Thread
                  </span>
                </div>

                {/* Expanded Comments Thread */}
                {isCommentsOpen && (
                  <div className="pt-3 mt-3 border-t border-[#39BAFF]/15 space-y-3">
                    <div className="space-y-2">
                      {post.comments?.map((c, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/15 space-y-1 text-xs">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[#F4F8FF]">{c.author_name}</span>
                            <span className="text-[#4B6485] font-mono">
                              {new Date(c.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#8EABCF] leading-relaxed">{c.body}</p>
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
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#030712]/90 text-[#F4F8FF] border border-[#39BAFF]/25 text-xs focus:border-[#39BAFF] focus:outline-none"
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
