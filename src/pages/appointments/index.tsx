import React, { useEffect } from 'react'
import { Typography, Card, Table, Button, Space, Tag } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store'
import { appointmentsSelectors } from '../../features/appointments'
import { fetchAppointments } from '../../features/appointments/appointmentsThunks'

const { Title } = Typography

const statusColors = {
  'scheduled': 'blue',
  'in-progress': 'orange',
  'completed': 'green',
  'cancelled': 'red'
}

const AppointmentsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const appointments = useAppSelector(appointmentsSelectors.selectAllAppointments)
  const status = useAppSelector(appointmentsSelectors.selectAppointmentStatus)
  const error = useAppSelector(appointmentsSelectors.selectAppointmentError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments()) 
    }
  }, [status, dispatch])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text: string, record: any) => text || record.clientId
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status as keyof typeof statusColors] || 'default'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="primary" size="small">View</Button>
          <Button size="small">Edit</Button>
        </Space>
      )
    }
  ]

  if (status === 'loading') {
    return <div>Loading appointments...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Appointments</Title>
          <Button type="primary">Add Appointment</Button>
        </div>
        
        <Card>
          <Table 
            dataSource={appointments.map((app: any) => ({ ...app, key: app.id }))} 
            columns={columns} 
            pagination={{ pageSize: 10 }}
            rowKey="id"
          />
        </Card>
      </Space>
    </div>
  )
}

export default AppointmentsPage