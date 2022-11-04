<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function id()
    {
        return auth('sanctum')->id();
    }

    public static function registerUser($request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->sendEmailVerificationNotification();
        $user_id = $user->id;

        $avatar = User::generateAvatar($request->first_name, $user_id);
        $user->findOrFail($user_id)->update(["avatar" => $avatar]);

        return $user;
    }

    public static function generateAvatar($fname, $user_id)
    {
        $first_name = str_replace(' ', '', strtolower($fname));
        return "https://api.multiavatar.com/$first_name&id=$user_id.png";
    }

    public static function setActiveStatus($status)
    {
        $user_id = auth('sanctum')->id();
        $user = User::findOrFail($user_id);
        $user->update(['is_active' => $status]); 
    }
}
