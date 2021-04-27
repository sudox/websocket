using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodosApi.Domain
{
    public class TodosDataContext : DbContext
    {
        public TodosDataContext(DbContextOptions<TodosDataContext> options):base(options)
        {

        }

        public DbSet<Todo> Todos { get; set; }
    }
}
