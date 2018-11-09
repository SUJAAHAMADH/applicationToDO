using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApplication.Models;

namespace TodoApplication.Controllers
{
    
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserController(TodoContext context)
        {
            _context = context;

            //if (_context.users.Count() == 0)
            //{
            //    // Create a new TodoItem if collection is empty,
            //    // which means you can't delete all TodoItems.
            //    _context.users.Add(new user { userName = "Suja",Email="sujasgk2@gmail.com",password="123" });
            //    _context.SaveChanges();
            //}
        }
        [Route("api/user")]
        [HttpGet]
        public ActionResult<List<user>> GetAll()
        {
            return _context.users.ToList();
        }

        [Route("api/user")]
        [HttpPost]
        public IActionResult Create(user item)
        {
            _context.users.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        }
        [Route("api/user/{id}")]
        [HttpPatch]
        public IActionResult Update(long id, user item)
        {
            var usermodel = _context.users.Find(id);
            if (usermodel == null)
            {
                return NotFound();
            }

            usermodel.userName = item.userName;
            usermodel.Email = item.Email;
            //usermodel.password = item.password;

            _context.users.Update(usermodel);
            _context.SaveChanges();
            return NoContent();
        }
        [Route("api/user/{id}")]
        [HttpDelete]
        public IActionResult Delete(long id)
        {
            var usermodel = _context.users.Find(id);
            if (usermodel == null)
            {
                return NotFound();
            }

            _context.users.Remove(usermodel);
            _context.SaveChanges();
            return NoContent();
        }


        //login
        [Route("api/user/login")]
        [HttpPost]
        public ActionResult<user>Login(user item)
        {
            //item.userName = "Suja";
            //item.password = "123456";
            var user = _context.users.FirstOrDefault(x => x.userName == item.userName && x.password == item.password);
            if (user == null)
            {
                return NotFound();
            }

            return user;
      
        }


    }
}