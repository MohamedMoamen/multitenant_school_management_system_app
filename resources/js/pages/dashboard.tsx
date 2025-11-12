import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Book, BookOpen, GraduationCap, ListChecks, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    schoolName?: string;
    totalStudents?: number;
    totalCourses?: number;
    totalTeachers?: number;
    totalSubjects?: number;
    totalEnrollments?: number;
}

interface Stat {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    key: keyof PageProps;
    description: string;
    color: string;
}

const stats: Stat[] = [
    {
        label: 'Students',
        icon: Users,
        key: 'totalStudents',
        description: 'Total students in your school',
        color: 'text-blue-500',
    },
    {
        label: 'Courses',
        icon: Book,
        key: 'totalCourses',
        description: 'Total courses offered',
        color: 'text-green-500',
    },
    {
        label: 'Teachers',
        icon: GraduationCap,
        key: 'totalTeachers',
        description: 'Total teachers',
        color: 'text-purple-500',
    },
    {
        label: 'Subjects',
        icon: BookOpen,
        key: 'totalSubjects',
        description: 'Unique subjects taught',
        color: 'text-green-500',
    },
    {
        label: 'Enrollments',
        icon: ListChecks,
        key: 'totalEnrollments',
        description: 'Total course enrollments',
        color: 'text-pink-500',
    },
];

export default function Dashboard() {
    const { props: pageProps } = usePage<{ props: PageProps }>();

    if (!pageProps) return null; 

    
    const schoolName = pageProps.schoolName;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="mb-2 text-left text-4xl font-extrabold tracking-tight text-primary drop-shadow-lg"></h1>

                        
                        {typeof schoolName === 'string' && (
                            <div className="mb-2 text-left text-xl font-semibold text-gray-700 dark:text-gray-200">
                                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 font-bold text-primary shadow-sm dark:bg-primary/20">
                                    {schoolName!}
                                </span>
                            </div>
                        )}

                        <div className="mb-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-pink-400"></div>

                        
                        <div className="mb-8 grid grid-cols-1 gap-8 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-2xl sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 dark:border-neutral-800 dark:bg-neutral-900/80">
                            {stats.map(({ label, icon: Icon, key, description, color }) => {
                                const value = pageProps[key];
                                const numericValue = typeof value === 'number' ? value : 0;

                                return (
                                    <Card key={label} className="transition-all hover:scale-105 hover:shadow-xl">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                                <Icon className={`h-6 w-6 ${color}`} />
                                                {label}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mb-1 text-center text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow dark:text-white">
                                                {numericValue}
                                            </div>
                                            <CardDescription className="text-center text-base">
                                                {description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
