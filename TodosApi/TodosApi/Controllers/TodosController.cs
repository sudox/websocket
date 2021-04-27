using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodosApi.Domain;

namespace TodosApi.Controllers
{
    [Route("todos")]
    public class TodosController : ControllerBase
    {
        private readonly TodosDataContext _context;

        public TodosController(TodosDataContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var todos = await _context.Todos.ToListAsync();
            return Ok(new { data = todos });
        }

        [HttpPost]
        public async Task<ActionResult> AddTodo([FromBody] PostTodoCreate request)
        {
            var todo = new Todo { Description = request.Description, Completed = request.Completed };
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.SingleOrDefaultAsync(t => t.Id == id);
            if(todo != null)
            {
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }

        [HttpPost("{id:int}/completed")]
        public async Task<ActionResult> MarkCompleted([FromBody] Todo request)
        {
            var todo = await _context.Todos.SingleOrDefaultAsync(t => t.Id == request.Id);
            if(todo == null)
            {
                return NotFound();
            } else
            {
                todo.Completed = true;
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
        [HttpPost("{id:int}/incomplete")]
        public async Task<ActionResult> MarkIncomplete([FromBody] Todo request)
        {
            var todo = await _context.Todos.SingleOrDefaultAsync(t => t.Id == request.Id);
            if (todo == null)
            {
                return NotFound();
            }
            else
            {
                todo.Completed = false;
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPut("{id:int}/description")]
        public async Task<ActionResult> UpdateDescription(int id, [FromBody] string description)
        {
            var todo = await _context.Todos.SingleOrDefaultAsync(t => t.Id == id);
            if(todo == null)
            {
                return NotFound();
            } else
            {
                todo.Description = description;
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }
    }

    public record PostTodoCreate(string Description, bool Completed);
}
