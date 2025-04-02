import React, { memo } from 'react';
import { Space, Tag } from 'antd';

interface TagsListProps {
  tags: string[];
  activeTag: string;
  onTagClick: (tag: string) => void;
}

const TagsList = memo(({ tags, activeTag, onTagClick }: TagsListProps) => {
  return (
    <Space wrap style={{ marginBottom: '16px' }}>
      {tags.map(tag => (
        <Tag 
          key={tag}
          color={activeTag === tag ? 'blue' : 'default'}
          style={{ cursor: 'pointer', padding: '4px 8px' }}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  );
});

export default TagsList;
