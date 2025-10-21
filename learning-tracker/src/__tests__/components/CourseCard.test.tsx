import { render, screen } from '@testing-library/react';
import { CourseCard } from '@/components/courses/CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    color: '#10b981',
    totalEstimatedHours: 10,
    _count: {
      modules: 5,
    },
    createdAt: new Date('2025-01-01').toISOString(),
  };

  it('renders course title', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  it('renders course description', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays module count', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText(/5 modules/i)).toBeInTheDocument();
  });

  it('displays estimated hours', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText(/10h/i)).toBeInTheDocument();
  });

  it('renders without description', () => {
    const courseWithoutDesc = { ...mockCourse, description: undefined };
    render(<CourseCard course={courseWithoutDesc} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });
});

