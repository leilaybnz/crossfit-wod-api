import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  AlreadyExistsError,
  createNewMember,
  createNewWorkout,
} from "../services/wod";

export async function postWorkout(request: NextRequest) {
  const body = await request.json();

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.mobility ||
    !body.activation ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return NextResponse.json(
      {
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'mobility', 'activation', 'exercises', 'trainerTips'",
        },
      },
      {
        status: 400,
      }
    );
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    mobility: body.mobility,
    activation: body.activation,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
    id: randomUUID(),
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  };

  revalidatePath("/");

  try {
    const createdWorkout = await createNewWorkout(newWorkout);

    return NextResponse.json(
      {
        status: "OK",
        data: createdWorkout,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    if (error instanceof AlreadyExistsError) {
      return NextResponse.json(
        {
          status: "FAILED",
          data: { error: error.message },
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: "FAILED",
        data: { error },
      },
      {
        status: 500,
      }
    );
  }
}

export async function postMember(request: NextRequest) {
  const body = await request.json();

  if (
    !body.name ||
    !body.gender ||
    !body.dateOfBirth ||
    !body.email ||
    !body.password ||
    !body.member
  ) {
    return NextResponse.json(
      {
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password', 'member'",
        },
      },
      {
        status: 400,
      }
    );
  }

  const newMember = {
    name: body.name,
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    email: body.email,
    password: body.password,
    member: body.member,
    id: randomUUID(),
    createdAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
    updatedAt: new Date().toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    }),
  };

  revalidatePath("/");

  try {
    const createdMember = await createNewMember(newMember);

    return NextResponse.json(
      {
        status: "OK",
        data: createdMember,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    if (error instanceof AlreadyExistsError) {
      return NextResponse.json(
        {
          status: "FAILED",
          data: { error: error.message },
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        status: "FAILED",
        data: { error },
      },
      {
        status: 500,
      }
    );
  }
}
