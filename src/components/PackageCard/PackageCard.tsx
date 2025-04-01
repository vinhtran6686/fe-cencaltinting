import React from 'react';
import styled from '@emotion/styled';
import { Card, Select, DatePicker, TimePicker, Typography, Space } from 'antd';
import { colors, spacing } from '../../theme/tokens';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

export interface Technician {
  id: string | number;
  name: string;
}

export interface PackageCardProps {
  packageName: string;
  services: string[];
  price: number;
  image?: string;
  technicians?: Technician[];
  selectedTechnicianId?: string | number;
  startDate?: Date;
  startTime?: string;
  estimatedEndDate?: Date;
  onTechnicianChange?: (technicianId: string | number) => void;
  onDateChange?: (date: Date) => void;
  onTimeChange?: (time: string) => void;
  className?: string;
}

const StyledCard = styled(Card)`
  &.ant-card {
    border-radius: ${spacing.xs};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    margin-bottom: ${spacing.md};
    overflow: hidden;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${spacing.xs};
  overflow: hidden;
  margin-right: ${spacing.md};
  background-color: ${colors.backgroundLight};
  flex-shrink: 0;
`;

const PackageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  color: ${colors.textSecondary};
  font-size: 24px;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const PriceTag = styled.div`
  background-color: ${colors.success}10;
  color: ${colors.success};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${spacing.xs};
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
`;

const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 ${spacing.md} 0;
`;

const ServiceItem = styled.li`
  padding: ${spacing.xs} 0;
  display: flex;
  align-items: center;
  
  &:before {
    content: '•';
    color: ${colors.primary};
    margin-right: ${spacing.xs};
  }
`;

const FormRow = styled.div`
  margin-bottom: ${spacing.md};
  
  .ant-select, .ant-picker {
    width: 100%;
  }
  
  .ant-typography {
    margin-bottom: ${spacing.xs};
  }
`;

const EndDateDisplay = styled.div`
  background-color: ${colors.info}10;
  border: 1px solid ${colors.info}20;
  border-radius: ${spacing.xs};
  padding: ${spacing.sm};
  color: ${colors.info};
  font-size: 14px;
`;

export const PackageCard: React.FC<PackageCardProps> = ({
  packageName,
  services,
  price,
  image,
  technicians = [],
  selectedTechnicianId,
  startDate,
  startTime,
  estimatedEndDate,
  onTechnicianChange,
  onDateChange,
  onTimeChange,
  className,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  
  const handleTechnicianChange = (value: string | number) => {
    onTechnicianChange?.(value);
  };
  
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      onDateChange?.(date.toDate());
    }
  };
  
  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      onTimeChange?.(time.format('HH:mm'));
    }
  };
  
  const formatEndDate = (date?: Date) => {
    if (!date) return 'Not calculated';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' - ' + 
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  return (
    <StyledCard className={className}>
      <CardHeader>
        <ImageContainer>
          {image ? (
            <PackageImage src={image} alt={packageName} />
          ) : (
            <DefaultImage>P</DefaultImage>
          )}
        </ImageContainer>
        
        <HeaderContent>
          <Title level={5} style={{ margin: 0 }}>{packageName}</Title>
          <PriceTag>Total Cost: {formattedPrice}</PriceTag>
        </HeaderContent>
      </CardHeader>
      
      <ServiceList>
        {services.map((service, index) => (
          <ServiceItem key={index}>{service}</ServiceItem>
        ))}
      </ServiceList>
      
      <FormRow>
        <Text strong>Technician Assigned</Text>
        <Select
          placeholder="Select technician"
          value={selectedTechnicianId}
          onChange={handleTechnicianChange}
          options={technicians.map(tech => ({
            label: tech.name,
            value: tech.id,
          }))}
        />
      </FormRow>
      
      <Space size={'small'} style={{ width: '100%', marginBottom: spacing.md }}>
        <FormRow style={{ flex: 1 }}>
          <Text strong>Start Date</Text>
          <DatePicker 
            value={startDate ? dayjs(startDate) : undefined}
            onChange={handleDateChange}
          />
        </FormRow>
        
        <FormRow style={{ flex: 1 }}>
          <Text strong>Start Time</Text>
          <TimePicker 
            format="HH:mm"
            value={startTime ? dayjs(startTime, 'HH:mm') : undefined}
            onChange={handleTimeChange}
            minuteStep={15}
          />
        </FormRow>
      </Space>
      
      <FormRow>
        <Text strong>Estimated End Date</Text>
        <EndDateDisplay>
          {formatEndDate(estimatedEndDate)}
        </EndDateDisplay>
      </FormRow>
    </StyledCard>
  );
};

export default PackageCard; 