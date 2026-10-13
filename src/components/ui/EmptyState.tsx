import React from 'react';
import { Terminal, RefreshCw } from 'lucide-react';
import { PillButton } from './PillButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No Records Found',
  description = 'No telemetry received matching your current filter parameters.',
  actionText,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-[20px] border border-dashed border-zinc-800 bg-zinc-950/30">
      <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 mb-4 text-zinc-400">
        {icon || <Terminal className="w-8 h-8 text-signal" />}
      </div>
      <h3 className="text-lg font-heading font-medium tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6 font-mono text-xs sm:text-sm">
        {description}
      </p>
      {actionText && onAction && (
        <PillButton variant="outline" onClick={onAction}>
          <RefreshCw className="w-3.5 h-3.5 mr-2" />
          {actionText}
        </PillButton>
      )}
    </div>
  );
}
