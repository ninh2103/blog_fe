import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            {/* Header */}

            {/* Page body */}
            <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Main content */}
                    <main className="flex-1 min-w-0" id="main-content">
                        <Outlet />
                    </main>

                    {/* Sidebar — below content on mobile, right side on desktop */}
                    <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-[86px]">
                    </div>
                </div>
            </div>

            {/* Footer */}
        </div>
    )
}
