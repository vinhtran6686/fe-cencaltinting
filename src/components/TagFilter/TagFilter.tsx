import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import styled from '@emotion/styled';
import { colors, spacing } from '../../theme/tokens';

export interface TagFilterProps {
  tags: string[];
  selectedTags?: string[];
  onTagSelect?: (tags: string[]) => void;
  allOption?: boolean;
  allText?: string;
  multiple?: boolean;
  className?: string;
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};
`;

const StyledTag = styled(Tag)<{ $isSelected: boolean }>`
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: ${spacing.xs};
  margin-right: 0;
  transition: all 0.2s;
  
  ${props => props.$isSelected ? `
    background-color: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
  ` : `
    &:hover {
      color: ${colors.primary};
      border-color: ${colors.primary};
    }
  `}
`;

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags = [],
  onTagSelect,
  allOption = true,
  allText = 'All',
  multiple = false,
  className,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedTags);
  
  useEffect(() => {
    setSelected(selectedTags);
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    let newSelected: string[];
    
    if (tag === allText) {
      newSelected = selected.includes(allText) ? [] : [allText];
    } else if (multiple) {
      if (selected.includes(tag)) {
        newSelected = selected.filter(t => t !== tag);
      } else {
        newSelected = [...selected.filter(t => t !== allText), tag];
      }
    } else {
      newSelected = selected.includes(tag) ? [] : [tag];
    }
    
    setSelected(newSelected);
    onTagSelect?.(newSelected);
  };

  const isSelected = (tag: string) => selected.includes(tag);

  return (
    <TagsContainer className={className}>
      {allOption && (
        <StyledTag 
          $isSelected={isSelected(allText)}
          onClick={() => handleTagClick(allText)}
        >
          {allText}
        </StyledTag>
      )}
      
      {tags.map(tag => (
        <StyledTag
          key={tag}
          $isSelected={isSelected(tag)}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </StyledTag>
      ))}
    </TagsContainer>
  );
};

export default TagFilter;