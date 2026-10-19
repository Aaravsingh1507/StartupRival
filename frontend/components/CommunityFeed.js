'use client';

import { useState } from 'react';
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Tag, 
  Send, 
  PlusCircle, 
  Sparkles, 
  Users, 
  MapPin, 
  Filter 
} from 'lucide-react';
import ClayCard from './ClayCard';
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

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Create Action */}
      <div className="clay-card p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-white/10">
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
              className={`text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedType === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#181818] text-white border border-white/10 text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">All Sectors</option>
            {SECTORS.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="gap-1.5 shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isCommentsOpen = Boolean(expandedComments[post.id]);

          return (
            <ClayCard key={post.id} className="p-6 space-y-4 border-white/10 hover:border-white/20">
              {/* Header: Author + Tags + Date */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-black font-bold text-xs flex items-center justify-center shadow-sm">
                    {post.author_name?.charAt(0) || 'F'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{post.author_name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white uppercase">
                        {post.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#737373] mt-0.5 font-mono">
                      <span>{post.sector}</span>
                      <span>•</span>
                      <span>{post.region}</span>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#EDEDED] leading-relaxed whitespace-pre-line">
                  {post.body}
                </p>
              </div>

              {/* Interactions: Upvote, Comment, Share */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#A3A3A3]">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono">{post.upvotes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedComments((prev) => ({ ...prev, [post.id]: !isCommentsOpen }))
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comment_count || 0} Replies</span>
                  </button>
                </div>

                <span className="text-[10px] text-[#737373] font-mono">Verified Founder Thread</span>
              </div>

              {/* Expanded Comments Thread */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-white/5 space-y-3 animate-in fade-in duration-150">
                  <div className="space-y-2">
                    {post.comments?.map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#181818] border border-white/5 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-white">{c.author_name}</span>
                          <span className="text-[10px] font-mono text-[#737373]">
                            {new Date(c.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[#EDEDED] leading-relaxed">{c.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add reply input */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Write your advice or question..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#181818] text-white border border-white/10 text-xs focus:outline-none"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddComment(post.id)}
                      className="gap-1 text-xs shrink-0"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply</span>
                    </Button>
                  </div>
                </div>
              )}
            </ClayCard>
          );
        })}
      </div>

      <CreatePostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
