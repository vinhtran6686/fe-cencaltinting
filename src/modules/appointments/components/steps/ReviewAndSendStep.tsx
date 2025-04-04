import React, { useState, useRef, useEffect } from 'react';
import { 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Descriptions, 
  DatePicker, 
  TimePicker, 
  Select,
  Divider,
  Tag,
  Space,
  Carousel,
  Spin
} from 'antd';
import { 
  ClockCircleOutlined, 
  CarOutlined, 
  UserOutlined, 
  LeftOutlined, 
  RightOutlined,
  EditOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useContactDetails, useTechnicians, useAvailableSlots, useCalculateEndTime } from '@/modules/appointments/hooks';
import { ContactResponse } from '@/modules/appointments/services/contactsService';

const { Title, Text } = Typography;
const { Option } = Select;

interface ReviewAndSendStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  goToStep?: (step: number) => void;
}

const ReviewAndSendStep: React.FC<ReviewAndSendStepProps> = ({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  goToStep,
}) => {
  const carouselRef = useRef<any>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    formData.date ? dayjs(formData.date) : dayjs()
  );
  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs>(
    formData.date ? dayjs(formData.date) : dayjs()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(formData.time || null);
  
  // Get contact information
  const { data: contactData, isLoading: isLoadingContact } = useContactDetails(formData.contactId || '');
  const contact: ContactResponse | null = contactData || null;
  
  // Get technicians
  const { data: techniciansData, isLoading: isLoadingTechnicians } = useTechnicians();
  
  // Get available slots for selected date
  const serviceIds = formData.services?.map((service: any) => service.serviceIds || []).flat() || [];
  const { data: slotsData, isLoading: isLoadingSlots } = useAvailableSlots({
    date: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
    serviceIds
  });
  
  // Get estimated end time
  const { data: endTimeData, isLoading: isLoadingEndTime } = useCalculateEndTime({
    startDate: selectedDate ? selectedDate.format('YYYY-MM-DD') : '',
    startTime: selectedTime || '',
    serviceIds
  });
  
  // Calculate total price
  const totalPrice = formData.services?.reduce(
    (sum: number, service: any) => sum + (service.price || 0), 
    0
  ) || 0;
  
  // Calculate total estimated time (in minutes)
  const totalTime = formData.services?.reduce(
    (sum: number, service: any) => sum + (service.estimatedTime || 0), 
    0
  ) || 0;
  
  // Calculate estimated end date/time
  const estimatedEndDateTime = endTimeData ? 
    `${endTimeData.endDate} ${endTimeData.endTime}` : 
    null;
  
  // Handle date selection
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    setSelectedDate(date);
    updateFormData({ date: date.toDate() });
  };
  
  // Handle month selection
  const handleMonthChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    setSelectedMonth(date);
    // If selected date is in a different month, reset it
    if (selectedDate && !selectedDate.isSame(date, 'month')) {
      // Set to the first available date in the new month
      const newDate = getFirstAvailableDateInMonth(date);
      setSelectedDate(newDate);
      updateFormData({ date: newDate.toDate() });
    }
  };
  
  // Get first available date in month (current day if current month, or 1st day if future month)
  const getFirstAvailableDateInMonth = (monthDate: dayjs.Dayjs) => {
    const today = dayjs();
    
    if (monthDate.isSame(today, 'month')) {
      // If current month, start from today
      return today;
    } else {
      // If future month, start from the 1st day
      return monthDate.startOf('month');
    }
  };
  
  // Generate dates for the selected month
  const generateDatesForMonth = () => {
    const dates = [];
    const today = dayjs();
    const isCurrentMonth = selectedMonth.isSame(today, 'month');
    const startDay = isCurrentMonth ? today : selectedMonth.startOf('month');
    const endDay = selectedMonth.endOf('month');
    
    let currentDay = startDay;
    // while (!currentDay.isAfter(endDay, 'day')) {
    //   dates.push(currentDay);
    //   currentDay = currentDay.add(1, 'day');
    // }
    
    return dates;
  };
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateFormData({ time });
  };
  
  // Handle technician selection
  const handleTechnicianChange = (techId: string, serviceIndex: number) => {
    const updatedServices = [...(formData.services || [])];
    if (updatedServices[serviceIndex]) {
      updatedServices[serviceIndex].technicianId = techId;
    }
    
    updateFormData({ services: updatedServices });
  };
  
  // Format days for display
  const getDayName = (date: dayjs.Dayjs) => {
    return date.format('ddd');
  };
  
  const getDayNumber = (date: dayjs.Dayjs) => {
    return date.format('D');
  };
  
  // Carousel navigation functions
  const nextSlide = () => {
    carouselRef.current?.next();
  };
  
  const prevSlide = () => {
    carouselRef.current?.prev();
  };
  
  // Disables dates that are before today
  const disabledDate = (current: dayjs.Dayjs) => {
    // Disable months before current month
    return current && current.isBefore(dayjs().startOf('month'));
  };
  
  const dates = generateDatesForMonth();
  
  // Function to create carousel items, each with 5 dates
  const createCarouselItems = () => {
    const items = [];
    const chunkSize = 5;
    
    // for (let i = 0; i < dates.length; i += chunkSize) {
    //   const chunk = dates.slice(i, i + chunkSize);
    //   items.push(
    //     <div key={i} className="date-chunk">
    //       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //         {chunk.map((date, idx) => (
    //           <div
    //             key={idx}
    //             style={{
    //               width: '18%',
    //               textAlign: 'center',
    //               padding: '12px 8px',
    //               border: '1px solid #d9d9d9',
    //               borderRadius: '4px',
    //               cursor: 'pointer',
    //               backgroundColor: selectedDate?.isSame(date, 'day') ? '#1890ff' : 'transparent',
    //               color: selectedDate?.isSame(date, 'day') ? 'white' : 'inherit',
    //             }}
    //             onClick={() => handleDateChange(date)}
    //           >
    //             <div style={{ fontWeight: 'bold' }}>{getDayName(date)}</div>
    //             <div style={{ fontSize: '20px' }}>{getDayNumber(date)}</div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // }
    
    return items;
  };
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Client Information Card */}
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Title level={5} style={{ margin: 0 }}>Client Information</Title>
                <Button 
                  type="link" 
                  icon={<EditOutlined />} 
                  style={{ color: '#1890ff' }} 
                  onClick={() => goToStep && goToStep(1)}
                >
                  Edit
                </Button>
              </div>
            }
            style={{ background: '#1e1e1e', color: 'white' }}
            headStyle={{ border: 'none', color: 'white' }}
            bodyStyle={{ background: '#1e1e1e', padding: '24px' }}
          >
            {isLoadingContact ? (
              <Spin />
            ) : contact ? (
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Text style={{ fontSize: '18px', color: 'white' }}>{contact.name}</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>{contact.email}</Text>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', marginLeft: '24px' }}>{contact.phone}</Text>
                  </div>
                </Col>
                
                <Col span={24} style={{ marginTop: '16px' }}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Year</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Text style={{ color: 'white' }}>
                          {formData.vehicleDetails?.isCustomEntry 
                            ? formData.vehicleDetails?.customYear || 'N/A' 
                            : formData.vehicleDetails?.year || 'N/A'}
                        </Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Make</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Text style={{ color: 'white' }}>
                          {formData.vehicleDetails?.isCustomEntry 
                            ? formData.vehicleDetails?.customMake || 'N/A' 
                            : formData.vehicleDetails?.make || 'N/A'}
                        </Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Model</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Text style={{ color: 'white' }}>
                          {formData.vehicleDetails?.isCustomEntry 
                            ? formData.vehicleDetails?.customModel || 'N/A' 
                            : formData.vehicleDetails?.model || 'N/A'}
                        </Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Vehicle Type</Text>
                      <div style={{ marginTop: '4px' }}>
                        <Text style={{ color: 'white' }}>
                          {formData.vehicleDetails?.isCustomEntry 
                            ? formData.vehicleDetails?.customVehicleType || 'N/A' 
                            : formData.vehicleDetails?.vehicleType || 'N/A'}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Text style={{ color: 'white' }}>No contact selected</Text>
            )}
          </Card>
        </Col>
        
        {/* Date Selection */}
        <Col span={24}>
          <Card title="Select a Date">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <Text strong>Select a month:</Text>
              <DatePicker
                picker="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                disabledDate={disabledDate}
                allowClear={false}
              />
            </div>
            
            <div style={{ position: 'relative', margin: '0 20px' }}>
              <Button 
                type="text" 
                icon={<LeftOutlined />} 
                onClick={prevSlide}
                style={{ 
                  position: 'absolute', 
                  left: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  zIndex: 2 
                }}
              />
              
              <Carousel ref={carouselRef} dots={false}>
                {createCarouselItems()}
              </Carousel>
              
              <Button 
                type="text" 
                icon={<RightOutlined />} 
                onClick={nextSlide}
                style={{ 
                  position: 'absolute', 
                  right: -20, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  zIndex: 2 
                }}
              />
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <Text strong>Select a Time:</Text>
              {isLoadingSlots ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <Spin />
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '8px',
                  marginTop: '12px'
                }}>
                  {slotsData?.map((slot, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '8px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        textAlign: 'center',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        backgroundColor: selectedTime === slot.startTime 
                          ? '#1890ff' 
                          : slot.available 
                            ? 'transparent' 
                            : '#f5f5f5',
                        color: selectedTime === slot.startTime ? 'white' : 'inherit',
                        opacity: slot.available ? 1 : 0.5,
                      }}
                      onClick={() => slot.available && handleTimeSelect(slot.startTime)}
                    >
                      <Space>
                        <ClockCircleOutlined />
                        <span>{slot.startTime}</span>
                      </Space>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {estimatedEndDateTime && !isLoadingEndTime && (
              <div style={{ 
                marginTop: '24px', 
                padding: '12px', 
                backgroundColor: '#e6f7ff', 
                borderRadius: '4px',
                border: '1px solid #91d5ff'
              }}>
                <Text strong>Estimated End Date:</Text> {dayjs(`${endTimeData?.endDate} ${endTimeData?.endTime}`).format('MMMM D, YYYY - h:mm A')}
              </div>
            )}
          </Card>
        </Col>
        
        {/* Service Packages Card */}
        <Col span={24}>
          <Card title="Selected Services">
            {formData.services && formData.services.length > 0 ? (
              <Row gutter={[16, 16]}>
                {formData.services.map((service: any, index: number) => (
                  <Col span={12} key={service.key || index}>
                    <Card 
                      style={{ marginBottom: '16px', height: '100%' }}
                      type="inner"
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{service.name}</span>
                          <Tag color="green">Total Cost: ${service.price}</Tag>
                        </div>
                      }
                    >
                      <div style={{ marginBottom: '16px' }}>
                        {service.children?.map((child: any) => (
                          <div key={child.key || child._id} style={{ padding: '4px 0' }}>
                            • {child.name} (${child.price})
                          </div>
                        )) || 'No child services'}
                      </div>
                      
                      <Descriptions column={1}>
                        <Descriptions.Item label="Technician Assigned">
                          {isLoadingTechnicians ? (
                            <Spin />
                          ) : (
                            <Select
                              style={{ width: '100%' }}
                              placeholder="Select a technician"
                              value={service.technicianId}
                              onChange={(value) => handleTechnicianChange(value, index)}
                            >
                              {techniciansData?.map(tech => (
                                <Option key={tech._id} value={tech._id}>{tech.name}</Option>
                              ))}
                            </Select>
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Date">
                          <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            style={{ width: '100%' }}
                            disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
                          />
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Time">
                          <TimePicker
                            format="HH:mm"
                            value={selectedTime ? dayjs(selectedTime, 'HH:mm') : null}
                            onChange={(time) => time && handleTimeSelect(time.format('HH:mm'))}
                            style={{ width: '100%' }}
                            minuteStep={15}
                          />
                        </Descriptions.Item>
                        <Descriptions.Item label="Estimated End Date">
                          {isLoadingEndTime ? (
                            <Spin />
                          ) : estimatedEndDateTime ? (
                            dayjs(`${endTimeData?.endDate} ${endTimeData?.endTime}`).format('MMMM D, YYYY - h:mm A')
                          ) : (
                            'Not calculated yet'
                          )}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Text>No services selected</Text>
            )}
          </Card>
        </Col>
      </Row>
      
      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button 
          type="primary" 
          onClick={onSubmit}
          disabled={!selectedDate || !selectedTime || !formData.services?.length}
        >
          Send Appointment
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndSendStep; 