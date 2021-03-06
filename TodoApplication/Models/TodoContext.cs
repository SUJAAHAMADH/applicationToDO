﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.Models
{
    public class TodoContext:DbContext
    {     
            public TodoContext(DbContextOptions<TodoContext> options)
                : base(options)
            {
            }

            public DbSet<TodoItem> TodoItems { get; set; }
            public DbSet<user> users { get; set; }

    }
}
