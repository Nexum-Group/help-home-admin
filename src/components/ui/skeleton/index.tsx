import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={`skeleton ${className || ''}`} style={style} />;
}

export function UserCardSkeleton() {
  return (
    <div className="user-card-skeleton">
      <div className="user-card-skeleton-header">
        <Skeleton className="skeleton-avatar" />
        <div className="user-card-skeleton-info">
          <Skeleton className="skeleton-text skeleton-text-lg" />
          <Skeleton className="skeleton-text" />
        </div>
      </div>
      <div className="user-card-skeleton-meta">
        <Skeleton className="skeleton-badge" />
        <Skeleton className="skeleton-badge" />
        <Skeleton className="skeleton-text skeleton-text-sm" />
      </div>
      <Skeleton className="skeleton-button" />
    </div>
  );
}

export function UsersGridSkeleton({ count = 8, gridClass = 'users-grid' }: { count?: number; gridClass?: string }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="user-card-skeleton">
      <div className="user-card-skeleton-header">
        <Skeleton className="skeleton-avatar" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }} />
        <div className="user-card-skeleton-info">
          <Skeleton className="skeleton-text skeleton-text-lg" />
          <Skeleton className="skeleton-text" />
        </div>
      </div>
      <div className="user-card-skeleton-meta">
        <Skeleton className="skeleton-badge" />
        <Skeleton className="skeleton-badge" />
        <Skeleton className="skeleton-text skeleton-text-sm" />
      </div>
      <Skeleton className="skeleton-button" />
    </div>
  );
}

export function ProvidersGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="providers-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProviderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailCardSkeleton() {
  return (
    <div className="detail-card-skeleton">
      <Skeleton className="skeleton-title" />
      <div className="detail-card-skeleton-content">
        <Skeleton className="skeleton-text" />
        <Skeleton className="skeleton-text" />
        <Skeleton className="skeleton-text" />
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="admin-content">
      <Skeleton className="skeleton-back-link" />
      <div className="detail-grid">
        <div className="detail-card-skeleton detail-card-primary">
          <Skeleton className="skeleton-avatar-lg" />
          <Skeleton className="skeleton-text skeleton-text-xl" />
          <Skeleton className="skeleton-text" />
          <div className="detail-card-skeleton-badges">
            <Skeleton className="skeleton-badge" />
            <Skeleton className="skeleton-badge" />
          </div>
        </div>
        <DetailCardSkeleton />
        <DetailCardSkeleton />
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="admin-pagination">
      <Skeleton className="skeleton-button-sm" />
      <div className="admin-pagination-pages">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="skeleton-button-sm" />
        ))}
      </div>
      <Skeleton className="skeleton-button-sm" />
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className="admin-toolbar">
      <Skeleton className="skeleton-search" />
      <Skeleton className="skeleton-select" />
      <Skeleton className="skeleton-button" />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="admin-header">
      <Skeleton className="skeleton-header-title" />
      <div className="admin-header-user">
        <Skeleton className="skeleton-header-name" />
        <Skeleton className="skeleton-header-avatar" />
      </div>
    </header>
  );
}