import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 w-full fixed top-0">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-center">
                    <div className="flex space-x-4">
                        <Link to={'/'}><a href="" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">All Task</a></Link>
                        <Link to={'/createtask'}><a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Create Task</a></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
