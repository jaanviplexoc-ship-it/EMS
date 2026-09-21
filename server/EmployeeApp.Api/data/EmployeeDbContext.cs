using Microsoft.EntityFrameworkCore;
using EmployeeApp.Api.models;

namespace EmployeeApp.Api.data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) 
            :base(options)
        { 
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasPrecision(18,2);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Employee)
                .WithOne()
                .HasForeignKey<User>(u => u.EmployeeId);
        }

    }
}