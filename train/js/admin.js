/**
 * Railway Booking System - Admin Dashboard JavaScript
 * Handles admin dashboard functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar toggling
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-expanded');
            content.classList.toggle('content-expanded');
        });
    }

    // Section navigation
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update section title
            const sectionTitle = document.querySelector('.section-title');
            sectionTitle.textContent = this.textContent.trim();
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
            
            // If on mobile, close the sidebar after selection
            if (window.innerWidth < 992) {
                sidebar.classList.remove('sidebar-expanded');
            }
        });
    });

    // Customer Search Functionality
    const customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const customerRows = document.querySelectorAll('#customersTable tbody tr');
            
            customerRows.forEach(row => {
                const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const customerId = row.querySelector('td:first-child').textContent.toLowerCase();
                const customerMobile = row.querySelector('td:nth-child(3)').textContent;
                
                if (customerName.includes(searchTerm) || customerId.includes(searchTerm) || customerMobile.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Refresh Customer Table
    const refreshCustomerTable = document.getElementById('refreshCustomerTable');
    if (refreshCustomerTable) {
        refreshCustomerTable.addEventListener('click', function() {
            // Clear search input
            if (customerSearch) {
                customerSearch.value = '';
            }
            
            // Show all rows
            const customerRows = document.querySelectorAll('#customersTable tbody tr');
            customerRows.forEach(row => {
                row.style.display = '';
            });
            
            // Simulate refresh effect
            this.classList.add('rotating');
            setTimeout(() => {
                this.classList.remove('rotating');
                alert('Customer data refreshed');
            }, 1000);
        });
    }

    // Handle Delete Customer
    const deleteCustomerBtns = document.querySelectorAll('.delete-customer');
    deleteCustomerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const customerId = this.getAttribute('data-customer-id');
            document.getElementById('deleteCustomerId').textContent = customerId;
        });
    });

    // Confirm Delete Customer
    const confirmDeleteCustomer = document.getElementById('confirmDeleteCustomer');
    if (confirmDeleteCustomer) {
        confirmDeleteCustomer.addEventListener('click', function() {
            const customerId = document.getElementById('deleteCustomerId').textContent;
            
            // Find the row with the customer ID and remove it
            const customerTable = document.getElementById('customersTable');
            if (customerTable) {
                const rows = customerTable.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const id = row.querySelector('td:first-child').textContent;
                    if (id === customerId) {
                        row.remove();
                    }
                });
            }
            
            // Close the modal
            bootstrap.Modal.getInstance(document.getElementById('deleteCustomerModal')).hide();
            
            // Show success message
            alert(`Customer ${customerId} has been deleted successfully.`);
        });
    }

    // Register Train Form Handling
    const registerTrainForm = document.getElementById('registerTrainForm');
    if (registerTrainForm) {
        registerTrainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const trainName = document.getElementById('trainName').value.trim();
            const numSeats = document.getElementById('numSeats').value.trim();
            const fromStation = document.getElementById('fromStation').value;
            const toStation = document.getElementById('toStation').value;
            const trainOwnership = document.getElementById('trainOwnership').value;
            
            // Simple validation
            if (!trainName || !numSeats || !fromStation || !toStation || !trainOwnership) {
                alert('Please fill in all fields');
                return;
            }
            
            // Check if from and to stations are the same
            if (fromStation === toStation) {
                alert('From and To stations cannot be the same');
                return;
            }
            
            // Generate a random train ID
            const trainId = 'TRN' + Math.floor(100 + Math.random() * 900);
            
            // Update train registered modal with values
            document.getElementById('registeredTrainId').textContent = trainId;
            document.getElementById('registeredTrainName').textContent = trainName;
            document.getElementById('registeredFromStation').textContent = fromStation;
            document.getElementById('registeredToStation').textContent = toStation;
            
            // Show train registered modal
            const trainRegisteredModal = new bootstrap.Modal(document.getElementById('trainRegisteredModal'));
            trainRegisteredModal.show();
            
            // Add the new train to the recent trains table
            const recentTrainsTable = document.getElementById('recentTrainsTable');
            if (recentTrainsTable) {
                const tbody = recentTrainsTable.querySelector('tbody');
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${trainId}</td>
                    <td>${trainName}</td>
                    <td>${fromStation}</td>
                    <td>${toStation}</td>
                    <td>${numSeats}</td>
                    <td>${trainOwnership}</td>
                `;
                tbody.prepend(newRow);
            }
            
            // Reset form
            registerTrainForm.reset();
        });
    }

    // Update Admin Profile Form Handling
    const updateAdminProfileForm = document.getElementById('updateAdminProfileForm');
    if (updateAdminProfileForm) {
        // Handle password update checkbox
        const updateAdminPassword = document.getElementById('updateAdminPassword');
        const adminPasswordUpdateSection = document.getElementById('adminPasswordUpdateSection');
        
        if (updateAdminPassword && adminPasswordUpdateSection) {
            updateAdminPassword.addEventListener('change', function() {
                if (this.checked) {
                    adminPasswordUpdateSection.classList.remove('d-none');
                } else {
                    adminPasswordUpdateSection.classList.add('d-none');
                }
            });
        }
        
        // Form submission
        updateAdminProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('adminUsername').value.trim();
            const mobile = document.getElementById('adminMobile').value.trim();
            const email = document.getElementById('adminEmail').value.trim();
            
            // Simple validation
            if (!username || !mobile || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Check if password update is enabled
            if (updateAdminPassword.checked) {
                const currentPassword = document.getElementById('adminCurrentPassword').value.trim();
                const newPassword = document.getElementById('adminNewPassword').value.trim();
                const confirmNewPassword = document.getElementById('adminConfirmNewPassword').value.trim();
                
                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    alert('Please fill in all password fields');
                    return;
                }
                
                if (newPassword !== confirmNewPassword) {
                    alert('New password and confirm password do not match');
                    return;
                }
            }
            
            // Show success message
            alert('Admin profile has been updated successfully!');
            
            // Reset password fields if they were visible
            if (updateAdminPassword.checked) {
                document.getElementById('adminCurrentPassword').value = '';
                document.getElementById('adminNewPassword').value = '';
                document.getElementById('adminConfirmNewPassword').value = '';
                updateAdminPassword.checked = false;
                adminPasswordUpdateSection.classList.add('d-none');
            }
        });
    }

    // Handle Admin Profile Modal
    const adminProfileMenuLink = document.getElementById('adminProfileMenuLink');
    if (adminProfileMenuLink) {
        adminProfileMenuLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, these would be retrieved from the backend or local storage
            document.getElementById('adminProfileUsername').textContent = 'admin';
            document.getElementById('adminProfileMobile').textContent = '9876543200';
            document.getElementById('adminProfileEmail').textContent = 'admin@railbooker.com';
            document.getElementById('adminProfileRole').textContent = 'System Administrator';
            
            // Show the profile modal
            const profileModal = new bootstrap.Modal(document.getElementById('adminProfileModal'));
            profileModal.show();
        });
    }
    
    // Handle Edit Admin Profile button in Profile Modal
    const editAdminProfileBtn = document.getElementById('editAdminProfileBtn');
    if (editAdminProfileBtn) {
        editAdminProfileBtn.addEventListener('click', function() {
            // Close the modal first
            const profileModal = bootstrap.Modal.getInstance(document.getElementById('adminProfileModal'));
            if (profileModal) {
                profileModal.hide();
            }
            
            // Navigate to update details section after a small delay to ensure modal is closed
            setTimeout(() => {
                // Hide all sections
                const sections = document.querySelectorAll('.dashboard-section');
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                
                // Show the profile section
                document.getElementById('profile-section').classList.add('active-section');
                
                // Update section title
                const sectionTitle = document.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.textContent = 'Profile';
                }
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Scroll to the top of the profile section
                window.scrollTo(0, 0);
            }, 300);
        });
    }

    // Add CSS class for refresh button animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotating {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .rotating {
            animation: rotating 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
}); 