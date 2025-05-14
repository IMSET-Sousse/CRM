#!/usr/bin/env python
"""
Setup script to prepare the Django environment
"""
import os
import subprocess
import sys
from pathlib import Path

def check_python_version():
    """Check Python version is at least 3.8+"""
    version_info = sys.version_info
    if version_info.major < 3 or (version_info.major == 3 and version_info.minor < 8):
        print("Python 3.8+ is required")
        sys.exit(1)
    print(f"Using Python {version_info.major}.{version_info.minor}.{version_info.micro}")

def check_virtual_env():
    """Check if running in a virtual environment"""
    if not hasattr(sys, 'base_prefix') or sys.base_prefix == sys.prefix:
        print("WARNING: It is recommended to run this script in a virtual environment!")
    else:
        print("Virtual environment detected")

def check_dependencies():
    """Check if all dependencies are installed"""
    try:
        import django
        print(f"Django {django.__version__} is installed")
        
        import rest_framework
        print(f"Django REST Framework is installed")
        
        import rest_framework_simplejwt
        print(f"SimpleJWT is installed")
        
        import corsheaders
        print(f"CORS headers is installed")
        
        import drf_spectacular
        print(f"DRF Spectacular is installed")
        
        import dotenv
        print(f"python-dotenv is installed")
        
    except ImportError as e:
        print(f"ERROR: {e}")
        print("Please install all dependencies with: pip install -r requirements.txt")
        sys.exit(1)

def create_env_file():
    """Create a .env file if it doesn't exist"""
    env_path = Path('.env')
    
    if not env_path.exists():
        print("Creating .env file...")
        with open(env_path, 'w') as f:
            f.write("DEBUG=True\n")
            f.write("SECRET_KEY=django-insecure-4(*f_2ofdhi#s8#7)m_^rr8c=_uf0v!j0^=3z4+^0$v15p@nz!\n")
            f.write("ALLOWED_HOSTS=localhost,127.0.0.1\n")
            f.write("CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000\n")
            f.write("DATABASE_URL=sqlite:///db.sqlite3\n")
        print(".env file created")
    else:
        print(".env file already exists")

def check_django_apps():
    """Check if all Django apps are properly configured"""
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
        import django
        django.setup()
        
        from django.apps import apps
        
        required_apps = [
            'apps.users',
            'apps.clients',
            'apps.projets',
            'apps.opportunites',
            'apps.taches',
            'apps.dashboard',
            'apps.rapports',
        ]
        
        for app_name in required_apps:
            try:
                app_config = apps.get_app_config(app_name.split('.')[-1])
                print(f"App '{app_config.verbose_name}' is configured correctly")
            except LookupError:
                print(f"WARNING: App '{app_name}' is not properly configured!")
                
    except Exception as e:
        print(f"ERROR checking Django apps: {e}")

def create_initial_migrations():
    """Create initial migrations for all apps"""
    print("\nCreating initial migrations...")
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'users'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'clients'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'projets'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'opportunites'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'taches'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'dashboard'], check=False)
    subprocess.run([sys.executable, 'manage.py', 'makemigrations', 'rapports'], check=False)
    
    print("\nApplying migrations...")
    subprocess.run([sys.executable, 'manage.py', 'migrate'], check=False)

def main():
    """Main function to check the environment and setup Django"""
    print("Django CRM setup script")
    print("======================\n")
    
    check_python_version()
    check_virtual_env()
    check_dependencies()
    create_env_file()
    check_django_apps()
    
    choice = input("\nDo you want to create initial migrations? (y/n): ")
    if choice.lower() == 'y':
        create_initial_migrations()
    
    print("\nSetup complete!")
    print("\nYou can now run the server with:")
    print("python manage.py runserver")

if __name__ == "__main__":
    main() 