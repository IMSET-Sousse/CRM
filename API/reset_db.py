#!/usr/bin/env python
"""
Script to reset the database and migrations
"""
import os
import sys
import subprocess
from pathlib import Path

def main():
    """Reset database and migrations"""
    print("⚠️ This script will delete the database and all migrations ⚠️")
    confirm = input("Are you sure you want to continue? (y/n): ")
    
    if confirm.lower() != 'y':
        print("Aborted.")
        return
    
    # Delete database
    print("Removing database...")
    db_path = Path('db.sqlite3')
    if db_path.exists():
        db_path.unlink()
        print("Database removed.")
    else:
        print("No database found.")
    
    # Delete migration files (except __init__.py)
    apps_dir = Path('apps')
    for app_dir in apps_dir.glob('*/migrations'):
        print(f"Processing migrations in {app_dir}...")
        for migration_file in app_dir.glob('*.py'):
            if migration_file.name != '__init__.py':
                print(f"  Removing {migration_file}")
                migration_file.unlink()
    
    # Create migrations directory with __init__.py if it doesn't exist
    for app_dir in apps_dir.glob('*'):
        # Skip non-directories and __init__.py
        if not app_dir.is_dir() or app_dir.name == '__init__.py':
            continue
            
        migrations_dir = app_dir / 'migrations'
        if not migrations_dir.exists():
            print(f"Creating migrations directory for {app_dir.name}")
            migrations_dir.mkdir(exist_ok=True)
            init_file = migrations_dir / '__init__.py'
            init_file.touch()
    
    # Make fresh migrations
    print("\nCreating new migrations...")
    subprocess.run([sys.executable, 'manage.py', 'makemigrations'], check=True)
    
    # Apply migrations
    print("\nApplying migrations...")
    subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
    
    print("\nDone! The database has been reset.")

if __name__ == "__main__":
    main() 