import { useState, useEffect } from "react";

interface SnakeSegment {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: SnakeSegment[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = "RIGHT";
const APPLE = { x: 5, y: 5 };

const Home: React.FC = () => {
  const [keyState, setKeyState] = useState({} as any);
  const [snake, setSnake] = useState<SnakeSegment[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION);
  const [apple, setApple] = useState<SnakeSegment>(APPLE);
  const [queuedDirection, setQueuedDirection] = useState<string | null>(null);

  const touch = (key: string) => {
    switch (key) {
      case "UP":
        if (direction !== "DOWN") setQueuedDirection("UP");
        break;
      case "DOWN":
        if (direction !== "UP") setQueuedDirection("DOWN");
        break;
      case "LEFT":
        if (direction !== "RIGHT") setQueuedDirection("LEFT");
        break;
      case "RIGHT":
        if (direction !== "LEFT") setQueuedDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          if (direction !== "DOWN") setQueuedDirection("UP");
          break;
        case "s":
          if (direction !== "UP") setQueuedDirection("DOWN");
          break;
        case "a":
          if (direction !== "RIGHT") setQueuedDirection("LEFT");
          break;
        case "d":
          if (direction !== "LEFT") setQueuedDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const resetGame = () => {
      // Implemente a lógica de reinicialização do jogo aqui
      setSnake(INITIAL_SNAKE);
      setDirection(INITIAL_DIRECTION);
      setApple(APPLE);
      setQueuedDirection(null);
    };

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      const effectiveDirection = queuedDirection || direction;

      switch (effectiveDirection) {
        case "UP":
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "DOWN":
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case "LEFT":
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "RIGHT":
          head.x = (head.x + 1) % GRID_SIZE;
          break;
        default:
          break;
      }

      // Verificar colisão da cabeça com o corpo
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        // A cobra colidiu consigo mesma, ela morre
        alert("Game Over!"); // Aqui você pode personalizar a mensagem de "Game Over"
        resetGame(); // Reiniciar o jogo
        return;
      }

      newSnake.unshift(head);

      if (head.x === apple.x && head.y === apple.y) {
        setApple({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setDirection(effectiveDirection);
      setQueuedDirection(null);
    };

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 200);

    return () => {
      clearInterval(gameInterval);
    };
  }, [snake, direction, queuedDirection, apple]);

  return (
    <div className="grid py-10 px-6 text-white max-w-[32rem] mx-auto w-full gap-4">
      <div>SCORE: {snake.length}</div>
      <div className="grid grid-cols-20 gap-y-1 w-full">
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-x-1 w-full">
            {Array.from({ length: GRID_SIZE }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`w-full relative rounded-sm bg-gray-900`}
              >
                <div className="aspect-[1/1] relative">
                  <div
                    className={`w-full h-full rounded-sm absolute top-0 left-0 ease ${
                      snake.some(
                        (segment) =>
                          segment.x === colIndex && segment.y === rowIndex
                      )
                        ? "bg-green-400"
                        : apple.x === colIndex && apple.y === rowIndex
                        ? "bg-red-500 border-2 border-red-400"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-10">
        <div></div>
        <div className="flex items-center gap-4">
          <button
            onTouchStart={() => touch("LEFT")}
            onClick={() => touch("LEFT")}
            className="w-full p-4 bg-gray-900 rounded-md relative"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[2px]">
              {"<"}
            </span>
          </button>
          <div className="w-full grid gap-16">
            <button
              onTouchStart={() => touch("UP")}
              onClick={() => touch("UP")}
              className="w-full p-4 bg-gray-900 rounded-md relative"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ml-1">
                {"<"}
              </span>
            </button>
            <button
              onTouchStart={() => touch("DOWN")}
              onClick={() => touch("DOWN")}
              className="w-full p-4 bg-gray-900 rounded-md relative"
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 ml-1">
                {">"}
              </span>
            </button>
          </div>
          <button
            onTouchStart={() => touch("RIGHT")}
            onClick={() => touch("RIGHT")}
            className="w-full p-4 bg-gray-900 rounded-md relative"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[2px]">
              {">"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
