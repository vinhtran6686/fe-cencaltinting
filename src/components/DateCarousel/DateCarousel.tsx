import React, { useState, useRef } from 'react';
import { Carousel, Button } from 'antd';
import styled from '@emotion/styled';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselProps, CarouselRef } from 'antd/es/carousel';
import { colors, spacing } from '../../theme/tokens';

export interface DateCarouselProps extends Omit<CarouselProps, 'onChange'> {
  dates: Date[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  disabledDates?: Date[];
  daysPerSlide?: number;
  className?: string;
}

const Container = styled.div`
  position: relative;
  padding: 0 ${spacing.xl};
  margin-bottom: ${spacing.md};
`;

const StyledCarousel = styled(Carousel)`
  .slick-track {
    display: flex;
    align-items: stretch;
  }
  
  .slick-slide {
    height: auto;
    
    & > div {
      height: 100%;
    }
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const DateItem = styled.div<{ $isSelected: boolean; $isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.sm};
  border-radius: ${spacing.xs};
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  flex: 1;
  text-align: center;
  transition: all 0.2s;
  opacity: ${props => props.$isDisabled ? 0.5 : 1};
  
  ${props => props.$isSelected ? `
    background-color: ${colors.primary};
    color: white;
  ` : `
    &:hover {
      background-color: ${colors.backgroundHover};
    }
  `}
`;

const DayName = styled.div`
  font-weight: 500;
  margin-bottom: ${spacing.xs};
`;

const DateNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const CarouselButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  
  &.left {
    left: 0;
  }
  
  &.right {
    right: 0;
  }
`;

export const DateCarousel: React.FC<DateCarouselProps> = ({
  dates,
  selectedDate,
  onDateSelect,
  disabledDates = [],
  daysPerSlide = 7,
  className,
  ...props
}) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const handlePrev = () => {
    carouselRef.current?.prev();
  };
  
  const handleNext = () => {
    carouselRef.current?.next();
  };
  
  const handleSlideChange = (current: number) => {
    setActiveSlide(current);
  };
  
  const isDateDisabled = (date: Date) => {
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  };
  
  const isDateSelected = (date: Date) => {
    return selectedDate && selectedDate.toDateString() === date.toDateString();
  };
  
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    onDateSelect?.(date);
  };
  
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const formatDate = (date: Date) => {
    return date.getDate();
  };
  
  const slides = [];
  for (let i = 0; i < dates.length; i += daysPerSlide) {
    slides.push(dates.slice(i, i + daysPerSlide));
  }
  
  return (
    <Container className={className}>
      <CarouselButton 
        icon={<LeftOutlined />} 
        shape="circle" 
        onClick={handlePrev} 
        className="left"
        disabled={activeSlide === 0}
      />
      
      <StyledCarousel
        ref={carouselRef}
        dots={false}
        afterChange={handleSlideChange}
        {...props}
      >
        {slides.map((slideItems, slideIndex) => (
          <SlideContent key={slideIndex}>
            {slideItems.map((date, index) => (
              <DateItem
                key={index}
                $isSelected={isDateSelected(date) ?? false}
                $isDisabled={isDateDisabled(date)}
                onClick={() => handleDateClick(date)}
              >
                <DayName>{formatDay(date)}</DayName>
                <DateNumber>{formatDate(date)}</DateNumber>
              </DateItem>
            ))}
          </SlideContent>
        ))}
      </StyledCarousel>
      
      <CarouselButton 
        icon={<RightOutlined />} 
        shape="circle" 
        onClick={handleNext} 
        className="right"
        disabled={activeSlide === slides.length - 1}
      />
    </Container>
  );
};

export default DateCarousel; 